import React from 'react'
import choose from '../../img/chooseCategory.png'
import find from '../../img/findConsultant.png'
import contact from '../../img/contact.png'
import arrow from '../../img/arrow-right.png'
import {Description, DescriptionWrapper, MapsWrapper, Title} from "./mainPage-styled-components";
import css from './mainPage.module.css'
import ConsultantCard from "../consultantCard/ConsultantCard";
// import prev from '../../img/prev.png'
// import next from '../../img/next.png'
import Carousel from "./Carousel";
import grass from '../../img/culture.png'
import culture from '../../img/culture-bg.png'
import {Link} from "react-router-dom";
import {GlobalStateType} from "../../state/root-reducer";
import {getCategories} from "../../state/selectors";
import {connect} from "react-redux";


type Props = {
    categories: any
}
const MainPage: React.FC<Props> = (props) => {
    const {categories} = props
    return (
        <div>
            <Carousel/>
            <RoadMap/>
            <div className={css.consultant}>
                <div className={css.header}>
                    В какой сфере ищете консультацию?
                </div>
                <div className={css.linksWrapper}>
                    {categories.map((item:any)=> <Links key={item.id} index={item.id} title={item.title} url={item.image} />)}
                </div>
            </div>
            <List index={1} url={grass} title={'Культура'} description={' Комендант Бишкека Алмаз Орозалиев в среду, 8 апреля, подписал приказ о разрешении на\n' +
            '                                    передвижение кыргызстанцев, занятых в весенне-полевых и сельскохозяйственных работах.\n' +
            '                                    Поручено обеспечить свободное передвижение аграриев через блокпосты города с 7.00 до\n' +
            '                                    20.00.'}/>
            <List index={2} url={grass} title={'Технологии выращивания'} description={'Комендант Бишкека Алмаз Орозалиев в среду, 8 апреля, подписал приказ о разрешении на передвижение кыргызстанцев, занятых в весенне-полевых и сельскохозяйственных работах.\n' +
            'Поручено обеспечить свободное передвижение аграриев через блокпосты города с 7.00 до 20.00.'}/>
            <List index={3} url={grass} title={'Органика'} description={'Комендант Бишкека Алмаз Орозалиев в среду, 8 апреля, подписал приказ о разрешении на передвижение кыргызстанцев, занятых в весенне-полевых и сельскохозяйственных работах.\n' +
            'Поручено обеспечить свободное передвижение аграриев через блокпосты города с 7.00 до 20.00.'}/>
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
    index: number
    url: string
    title: string
    description: string
}
const List = (props: ListType) => {
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
                                <img src={grass} alt="grass"/>
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
                {/*<button className={css.prev}>*/}
                {/*    <img src={prev} alt="prev"/>*/}
                {/*</button>*/}
                <div className={css.cardsWrapper}>
                    <div>
                        <ConsultantCard id={'1'} specialization={[{id: 1, title:'Hello',}]} star={'4'} name={'Aman'} description={'skhfasfkahfksahj askfhasf sfih asfiashfias fasifas fafi as fiasfhf'} last_name={'Asylbekov'} url={'https://proforientator.ru/publications/articles/st27.10.2014_1.jpg'}/>
                        <ConsultantCard id={'1'} specialization={[{id: 1, title:'Hello',}]} star={'4'} name={'Aman'} description={'skhfasfkahfksahj askfhasf sfih asfiashfias fasifas fafi as fiasfhf'} last_name={'Asylbekov'} url={'https://proforientator.ru/publications/articles/st27.10.2014_1.jpg'}/>
                        <ConsultantCard id={'1'} specialization={[{id: 1, title:'Hello',}]} star={'4'} name={'Aman'} description={'skhfasfkahfksahj askfhasf sfih asfiashfias fasifas fafi as fiasfhf'} last_name={'Asylbekov'} url={'https://proforientator.ru/publications/articles/st27.10.2014_1.jpg'}/>
                    </div>
                </div>
                {/*<button className={css.next}>*/}
                {/*    <img src={next} alt="next"/>*/}
                {/*</button>*/}
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
        categories: getCategories(state)
    }
}
export default connect(mapStateToProps, {})(MainPage)
