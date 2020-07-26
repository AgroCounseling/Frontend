import React, {useEffect, useState} from 'react'
import choose from '../../img/chooseCategory.png'
import find from '../../img/findConsultant.png'
import contact from '../../img/contact.png'
import arrow from '../../img/arrow-right.png'
import {Description, DescriptionWrapper, MapsWrapper, Title} from "./mainPage-styled-components";
import css from './mainPage.module.css'
import ConsultantCard from "../consultantCard/ConsultantCard";
import Carousel from "./Carousel";
import grass from '../../img/culture.png'
import culture from '../../img/culture-bg.png'
import {Link} from "react-router-dom";
import {GlobalStateType} from "../../state/root-reducer";
import {getCategories, getSpecialties} from "../../state/selectors";
import {connect, useSelector} from "react-redux";
import api from '../../api/Api'
import prev from '../../img/prev.png'
import next from '../../img/next.png'

type Props = {
    categories: any,
    slider: any
}
const MainPage: React.FC<Props> = (props) => {
    const {categories, slider} = props
    const [categoriesArray, setCategoriesArray] = useState<any>([])
    const [current, setCurrent] = useState(0)

    function colSplit(arr: any, c: number) {
        let count = Math.ceil(arr.length / c)
        let res = new Array(count)
        for (let i = 0; i < count; ++i) {
            res[i] = [];
        }
        let index = 0;
        for (let j = 0; j < count; j++){
            for (index; index < c + (j*c); index++) {
                res[j].push(arr[index]);
            }
        }
        setCategoriesArray(res)
        return res
    }
    const onNext = () => {
        if(current+1 === categoriesArray.length){
            setCurrent(0)
        }else{
            setCurrent(current+1)
        }
    }
    const onPrev = () => {
        if(current === 0){
            setCurrent(categoriesArray.length-1)
        }else{
            setCurrent(current-1)
        }
    }
    useEffect(()=>{
        colSplit(categories, 4)
    }, [categories])
    return (
        <div>
            <Carousel slider={slider}/>
            <RoadMap/>
            <div className={css.consultant}>
                <div className={css.header}>
                    В какой сфере ищете консультацию?
                </div>
                <div className={css.linksWrapper}>
                    <div onClick={onPrev} className={css.prev}>
                        <img src={prev} alt="prev"/>
                    </div>
                    {
                        categoriesArray.length
                            ? categoriesArray[current].map((item: any) => item ? <Links
                                key={item.id} index={item.id} title={item.title} url={item.image}
                                /> : null
                                )
                            : null
                        // categories.map((item: any) => <Links
                        //     key={item.id} index={item.id} title={item.title} url={item.image}
                        // />)
                    }
                    <div onClick={onNext} className={css.next}>
                        <img src={next} alt="next"/>
                    </div>
                </div>
            </div>
            {
                categories.map((item: any, index: number) => <List
                    key={item.id}
                    id={item.id}
                    url={item.icon_image}
                    index={index}
                    title={item.title}
                    description={item.description}/>)
            }
        </div>
    )
}

type LinksProps = {
    index: number
    url: string
    title: string
}
const Links: React.FC<LinksProps> = (props) => {
    return (
        <Link to={`/consultants/${props.index}`} className={css.links}>
            <img src={props.url ? props.url : culture} alt="#"/>
            <div>
                <span>{props.title}</span>
            </div>
        </Link>
    )
}

type ListType = {
    id: number
    index: number
    url: string
    title: string
    description: string
}
const List = (props: ListType) => {
    const specialties = useSelector((state: GlobalStateType) => getSpecialties(state))
    const [consultants, setConsultants] = useState([])
    useEffect(() => {
        api.getConsultants(props.id)
            .then((res) => {
                setConsultants(res.data.results)
            })
    }, [])
    return (
        <div>
            <DescriptionWrapper>
                {
                    props.index % 2 === 0
                        ? <>
                            <div>
                                <Title>{props.title}</Title>
                                <Description>{props.description}</Description>
                            </div>
                            <div className={css.imageWrapper}>
                                <img src={props.url ? props.url : grass} alt="grass"/>
                            </div>
                        </>
                        : <>
                            <div className={css.imageWrapper}>
                                <img src={grass} alt="grass"/>
                            </div>
                            <div>
                                <Title>{props.title}</Title>
                                <Description>{props.description}</Description>
                            </div>
                        </>
                }
            </DescriptionWrapper>
            <div className={css.listWrapper}>
                <div className={css.cardsWrapper}>
                    <div>
                        {
                            consultants.map((item: any, index) => index > 2 ? null : <ConsultantCard
                                key={item.id}
                                id={item.id}
                                url={item.user.photo}
                                name={item.user.first_name}
                                last_name={item.user.last_name}
                                description={item.description}
                                star={item.middle_star}
                                specialization={item.specialty.map((item: any) => specialties.find((i: any) => item.category === i.id ? i.title : null))}
                            />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


const RoadMap = () => {
    return <MapsWrapper>
        <div>
            <img src={choose} alt="Choose"/>
            <span>
                Выберите категорию
            </span>
        </div>
        <div>
            <img src={arrow} className={css.arrows} alt="#"/>
            <span> </span>
        </div>
        <div>
            <img src={find} alt="find"/>
            <span>
                Найдите подходящего консультанта
            </span>
        </div>
        <div>
            <img src={arrow} className={css.arrows} alt="#"/>
            <span> </span>
        </div>
        <div>
            <img src={contact} alt="Contact"/>
            <span>
                Свяжитесь с экспертом и <br/>
                получите доступ к консультации
            </span>
        </div>
    </MapsWrapper>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        categories: getCategories(state),
        slider: state.app.slider
    }
}
export default connect(mapStateToProps, {})(MainPage)
