import React, {useEffect, useState} from 'react'
import css from './articles.module.css'
import api from '../../api/Api'
import {AxiosResponse} from "axios";
import Select from "react-select";
import {Link, useParams, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCategories} from "../../state/selectors";
import {GlobalStateType} from "../../state/root-reducer";
import Pagination from "../pagination/Pagination";
import {ArticleSearch} from "../Styles";
import Footer from "../footer/Footer";
import Preloader from "../preloader/Preloader";

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
    const params: any = useParams()
    const categories = useSelector((state: GlobalStateType) => getCategories(state))
    const categoriesList = categories.map((item: any) => {
        return {
            value: item.id,
            label: item.title
        }
    })

    const [pending, setPending] = useState(true)

    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(0)
    const [category, setCategory] = useState<any>(null)
    const [search, setSearch] = useState('')


    useEffect(() => {
        api.getArticles(search, page, params.id)
            .then((res: AxiosResponse) => {
                console.log(res)
                setArticles(res.data.results)
                setPagination(Math.ceil(res.data.count / res.data.limit))
                setPending(false)
            })
    }, [page, params, search])
    const categoryChange = (e: any) => {
        setCategory(e)
    }

    useEffect(() => {
        let data = categoriesList.filter((item: any) => item.value === +params.id ? item : null)
        setCategory(data)
    }, [])

    if (pending) {
        return <Preloader/>
    }
    return (
        <div style={{overflowX: 'hidden'}}>
            <div className={css.search}>
                <ArticleSearch value={search} onChange={(e: any) => setSearch(e.target.value)} type={'text'}/>
                <input type="submit" placeholder={''} value={''} className={css.submit}/>
            </div>
            <div className={css.articlesWrapper}>
                <ArticleNavBar categoryVal={category} setCategory={categoryChange} category={categoriesList}/>
                <div>
                    {
                        articles.map((item: any) => <Article

                            key={item.id}
                            id={item.id}
                            description={item.text}
                            title={item.title}
                            date={item.pub_date}
                            name={'Aman Asylbekov'}
                            category={item.category}
                        />)
                    }
                    <Pagination setPage={setPage} pageCount={pagination}/>
                </div>
            </div>
            <Footer/>
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
    const categories = useSelector((state: GlobalStateType) => getCategories(state))
    let category: any = categories.map((item: any) => props.category === item.id ? item.title : null)
    return (
        <Link to={`/article/${props.id}`}>
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
    categoryVal: any
    setCategory: any
}
export const ArticleNavBar: React.FC<ArticleNavBarProps> = (props) => {
    const history = useHistory()
    console.log(history)
    return (
        <div className={css.navBar}>
            <div className={css.newPopular}>
                <div>Новое</div>
                <div>Популярные</div>
            </div>
            <div className={css.filterWrapper}>
                <div>
                    <div className={css.filterCategory}>Категория</div>
                    <Select value={props.categoryVal} onChange={(e: any) => {
                        history.push(`/articles/${e.value}`)
                        props.setCategory(e)
                    }}
                            styles={selectStyle}
                            placeholder={'Введите или выберите категорию'}
                            options={props.category}/>
                </div>
                <div>
                    <div className={css.filterCategory}>Подкатегории</div>
                    <Select styles={selectStyle} placeholder={'Введите или выберите категорию'}
                            options={[{value: 1, label: 'Hello World'}]}/>
                </div>
                <div>
                    <div className={css.filterCategory}>Виды</div>
                    <Select styles={selectStyle} placeholder={'Введите или выберите категорию'}
                            options={[{value: 1, label: 'Hello World'}]}/>
                </div>
            </div>
        </div>
    )
}