import React, {useEffect, useState} from 'react'
import css from './article.module.css'
import { ArticleNavBar} from "../articles/Articles";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../state/root-reducer";
import {getCategories} from "../../state/selectors";
import api from "../../api/Api";
import {AxiosResponse} from "axios";
import {Link, Route, useParams} from 'react-router-dom';
import Preloader from "../preloader/Preloader";
import {ArticleSearch} from "../Styles";
import Footer from "../footer/Footer";


const ArticlePage = () => {
    const params:{id:any} = useParams()
    const [pending, setPending] = useState(true)
    const [article, setArticle] = useState<any>({})
    const categories = useSelector((state:GlobalStateType)=> getCategories(state) )
    let category:any = categories.map((item:any) => article.category === item.id ? item.title : null)
    useEffect(() => {
        api.getArticle(params.id)
            .then((res: AxiosResponse) => {
                console.log(res)
                setArticle(res.data)
                setPending(false)
                // setPagination(Math.ceil(res.data.count / res.data.limit))
            })
    }, [])

    if (pending) {
        return <Preloader />
    }
    return (
        <div style={{overflowX: 'hidden'}}>
            <div>
                <ArticleSearch type={'text'} />
            </div>
            <div className={css.articlesWrapper}>
                <ArticleNavBar category={category} />
                <Article
                    key={article.id}
                    id={article.id}
                    description={article.text}
                    title={article.title}
                    date={article.pub_date}
                    name={'Aman Asylbekov'}
                    category={article.category}
                    categories={categories}
                />
            </div>
            <Footer />
        </div>
    )
}

const Article = (props:any)=> {
    let category:any = props.categories.map((item:any) => props.category === item.id ? item.title : null)
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

export default ArticlePage