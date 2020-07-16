import React, {useEffect, useState} from 'react'
import css from './articles.module.css'
import api from '../../api/Api'
import {AxiosResponse} from "axios";
import Select from "react-select";
import {Link, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCategories} from "../../state/selectors";
import {GlobalStateType} from "../../state/root-reducer";
import Pagination from "../pagination/Pagination";
import {ArticleSearch} from "../Styles";
import Footer from "../footer/Footer";

const selectStyle = {
    control: (styles: any) => ({
        ...styles,
        // minWidth: '200px',
        border: 'none',
        borderRadius: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        background: 'rgba(194, 199, 208, 0.4)',
        fontSize: '13px'
    }),
    option: (styles: any) => {
        return {
            ...styles,
            fontSize: '13px',
            height: '20px',
            margin: 0,
            padding: '0 5px',
        }
    }
};


type Props = {}
const Articles: React.FC<Props> = (props) => {
    const categories = useSelector((state:GlobalStateType)=> getCategories(state) )
    const categoriesList = categories.map((item: any) => {
        return {
            value: item.id,
            label: item.title
        }
    })
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(0)

    useEffect(() => {
        api.getArticles(page)
            .then((res: AxiosResponse) => {
                console.log(res)
                setArticles(res.data.results)
                setPagination(Math.ceil(res.data.count / res.data.limit))
            })
    }, [page])
    return (
        <div style={{overflowX: 'hidden'}}>
            <div>
                <ArticleSearch type={'text'} />
            </div>
            <div className={css.articlesWrapper}>
                <ArticleNavBar category={categoriesList} />
                <div>
                    {
                        articles.map((item:any) => <Article
                            key={item.id}
                            id={item.id}
                            description={item.text}
                            title={item.title}
                            date={item.pub_date}
                            name={'Aman Asylbekov'}
                            category={item.category}
                        />)
                    }
                    {/*<Article id={1} category={'Инновация'} name={'Aнастасия Собор'} date={'сегодня в 12.45'}*/}
                    {/*         title={'ОРГАНИЧЕСКОЕ ЗЕМЛЕДЕЛИЕ И ЗДОРОВЬЕ ПОЧВЕННОЙ ЭКОСИСТЕМЫ'}*/}
                    {/*         description={'Сравниваются и обсуждаются разные по своему содержанию системы земледелия органическое и интенсивное. В\n' +*/}
                    {/*         '                связи с этим, предложено понятие «почвенная экосистема», каксовременная альтернатива традиционному\n' +*/}
                    {/*         '                пониманию почвы\n'}*/}
                    {/*/>*/}
                    <Pagination setPage={setPage} pageCount={pagination}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

type ArticleProps = {
    id: number
    category: string
    name: string
    date: string
    title: string
    description: string
}
export const Article: React.FC<ArticleProps> = (props) => {
    const categories = useSelector((state:GlobalStateType)=> getCategories(state) )
    let category:any = categories.map((item:any) => props.category === item.id ? item.title : null)
    return (
        <Link to={`article/${props.id}`}>
            <div className={css.article}>
                <div className={css.header}>
                    <div className={css.category}>{category}</div>
                    <div className={css.name}>Aнастасия Собор</div>
                    <div className={css.date}>{props.date}</div>
                </div>
                <div className={css.title}>
                    {props.title}
                </div>
                <div className={css.text}>{props.description}</div>
            </div>
        </Link>
    )
}

export default Articles


type ArticleNavBarProps = {
    category: any
}
export const ArticleNavBar:React.FC<ArticleNavBarProps> = (props) => {
    return (
        <div className={css.navBar}>
            <div className={css.newPopular}>
                <div>Новое</div>
                <div>Популярные</div>
            </div>
            <div className={css.filterWrapper}>
                <Select styles={selectStyle} placeholder={'Введите или выберите категорию'}
                        options={props.category}/>
                <Select styles={selectStyle} placeholder={'Введите или выберите категорию'}
                        options={[{value: 1, label: 'Hello World'}]}/>
                <Select styles={selectStyle} placeholder={'Введите или выберите категорию'}
                        options={[{value: 1, label: 'Hello World'}]}/>
            </div>
        </div>
    )
}