import React, {useEffect, useState} from 'react'
import css from './articles.module.css'
import api from '../../api/Api'
import {AxiosResponse} from "axios";
import Select from "react-select";
import {Link, useParams, useHistory, Switch, Route, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../state/selectors";
import {GlobalStateType} from "../../state/root-reducer";
import Pagination from "../pagination/Pagination";
import {ArticleSearch} from "../Styles";
import Footer from "../footer/Footer";
import Preloader from "../preloader/Preloader";
import like from "../../img/like.png";
import {selectStyle} from "../../utils/SelectStyle";
import Interweave from "interweave";
import NoElement from "../../utils/NoElement";
import {checkToken} from "../../state/authReducer";


type Props = {}
const Articles: React.FC<Props> = (props) => {
    const params: any = useParams()
    const history = useHistory()
    const {path, url} = useRouteMatch();
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
    const [subCategoriesList, setSubCategoriesList] = useState<any>([])
    const [subCategories, setSubCategories] = useState<any>(null)
    const [subCategory, setSubCategory] = useState<any>(null)
    // const [typesList, setTypesList] = useState([])
    const [types, setTypes] = useState<any>(null)
    const [type, setType] = useState<any>(null)
    // const [subType, setSubType] = useState(null)

    useEffect(() => {
        api.getArticles(
            search, page, +params.id === 0 ? null : params.id,
            subCategory ? subCategory.value : null,
            type ? type.value : null
        )
            .then((res: AxiosResponse) => {
                setArticles(res.data.results)
                setPagination(Math.ceil(res.data.count / res.data.limit))
                setPending(false)
            })
    }, [page, params, search, subCategory, type])

    const getNew = () => {
        // history.push(url)
        api.getNewArticles(
            search, page, +params.id === 0 ? null : params.id,
            subCategory ? subCategory.value : null,
            type ? type.value : null
        )
            .then((res: AxiosResponse) => {
                setArticles(res.data.results)
                setPagination(Math.ceil(res.data.count / res.data.limit))
            })
    }
    const getPopular = () => {
        api.getPopularArticles(
            search, page, +params.id === 0 ? null : params.id,
            subCategory ? subCategory.value : null,
            type ? type.value : null
        )
            .then((res: AxiosResponse) => {
                setArticles(res.data.results)
                setPagination(Math.ceil(res.data.count / res.data.limit))
            })
    }
    useEffect(() => {
        if (subCategory !== null) {
            api.getTypes()
                .then((res) => {
                    console.log(res)
                    let newArr = res.data.results.map((item: any) => ({
                        value: item.id,
                        label: item.title,
                        category: item.subcategory
                    }))
                    // setTypesList(newArr)
                    const arr = newArr.filter((item: any) => +subCategory.value === +item.category ? item : null)
                    setTypes(arr)
                })
        }
    }, [subCategory])

    useEffect(() => {
        const arr = subCategoriesList.filter((item: any) => +params.id === item.category ? item : null)
        setSubCategories(arr)
    }, [params])
    useEffect(() => {
        api.getSubCategory()
            .then((res: AxiosResponse) => {
                console.log(res.data.results)
                let newArr = res.data.results.map((item: any) => ({
                    value: item.id,
                    label: item.title,
                    category: item.category
                }))
                setSubCategoriesList(newArr)
                const arr = newArr.filter((item: any) => +params.id === item.category ? item : null)
                setSubCategories(arr)
            })
    }, [])
    const categoryChange = (e: any) => {
        setCategory(e)
        setSubCategory(null)
    }
    const subCategoryChange = (e: any) => {
        history.push(url)
        setSubCategory(e)
        setType(null)
    }
    const typeChange = (e: any) => {
        history.push(url)
        setType(e)
        // setSubType(null)
    }
    const onSearch = (e: any) => {
        history.push(url)
        setSearch(e.target.value)
    }

    useEffect(() => {
        let data = categoriesList.filter((item: any) => item.value === +params.id ? item : null)
        setCategory(data)
    }, [])

    if (pending) {
        return <Preloader/>
    }
    return (
        <div className={css.wrapper}>
            <Search value={search} setValue={onSearch}/>
            <div className={css.articlesWrapper}>
                <ArticleNavBar
                    getPopular={getPopular}
                    getNew={getNew}
                    typesOption={types}
                    types={type}
                    setTypes={typeChange}
                    subCategory={subCategory}
                    setSubCategory={subCategoryChange}
                    categoryVal={category}
                    setCategory={categoryChange}
                    category={categoriesList}
                    subCategories={subCategories}
                />
                <Switch>
                    <Route exact path={path}>
                        <div>
                            {
                                articles.length ? articles.map((item: any) => <Article

                                        key={item.id}
                                        id={item.id}
                                        description={item.text}
                                        title={item.title}
                                        date={item.pub_date}
                                        name={item.user.first_name + ' ' + item.user.last_name}
                                        category={item.category}
                                    />)

                                    :  <NoElement text={'Нет статей'} />
                            }
                            {
                                articles.length
                                    ? < Pagination setPage={setPage} pageCount={pagination}/>
                                    : null
                            }
                        </div>
                    </Route>
                    <Route path={`${path}/:article`}>
                        <DetailArticle/>
                    </Route>
                </Switch>
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
const Article: React.FC<ArticleProps> = (props) => {
    const {url} = useRouteMatch();
    const params: any = useParams()

    const categories = useSelector((state: GlobalStateType) => getCategories(state))
    let category: any = categories.map((item: any) => props.category === item.id ? item.title : null)
    return (
        <Link to={`${url}/${params.id ? '' : "0/"}${props.id}`}>
            <div className={css.article}>
                <div className={css.header}>
                    <div className={css.category}>{category}</div>
                    <div className={css.name}>{props.name}</div>
                    <div className={css.date}>{props.date}</div>
                </div>
                <div className={css.title}>
                    {props.title}
                </div>
                <div className={css.text}><Interweave content={props.description}/></div>
            </div>
        </Link>
    )
}

const DetailArticle = () => {
    const params: any = useParams()
    const dispatch = useDispatch()
    const categories = useSelector((state: GlobalStateType) => getCategories(state))
    const [article, setArticle] = useState<any>({})
    const [pending, setPending] = useState(true)
    const [vote, setVote] = useState(0)
    let category: any = categories.map((item: any) => article.category === item.id ? item.title : null)
    console.log(article)

    const checkLike = async (data:any) => {
        return  dispatch(checkToken(()=>api.putLike(article.id,data)))
    }

    const putLike = () => {
        checkLike({
            user: {
                first_name: article.user.first_name,
                last_name: article.user.last_name
            },
            vote: true
        }).then((res)=> {
            setVote(vote+1)
            console.log(res)
        })
    }

    useEffect(() => {
        api.getArticle(params.article)
            .then((res: AxiosResponse) => {
                setArticle(res.data)
                setVote(res.data.votes)
                setPending(false)
            })
    }, [params.article])

    if (pending) {
        return <div><Preloader/></div>
    }
    return (
        <div className={css.article}>
            <div className={css.header}>
                <div className={css.category}>{category}</div>
                <div className={css.name}>{article.user.first_name + ' ' + article.user.last_name}</div>
                <div className={css.date}>{article.pub_date}</div>
            </div>
            <div className={css.title}>
                {article.title}
            </div>
            <div className={css.ArticleText}><Interweave content={article.text}/></div>
            <div className={css.likes}>
                <div onClick={putLike} className={css.imgWrapper}>
                    <img src={like} alt="Like"/> Понравилась
                </div>
                <div className={css.count}>
                    {vote}
                </div>
            </div>
        </div>
    )
}

type ArticleNavBarProps = {
    category: any
    categoryVal: any
    setCategory: any
    subCategory: any
    setSubCategory: (e: any) => void
    subCategories: [{}]
    types: any
    setTypes: (e: any) => void
    typesOption: [{}]
    getNew: () => void
    getPopular: () => void
}

export const ArticleNavBar: React.FC<ArticleNavBarProps> = (props) => {
    const history = useHistory()
    return (
        <div className={css.navBar}>
            <div className={css.newPopular}>
                <div onClick={props.getNew}>Новое</div>
                <div onClick={props.getPopular}>Популярные</div>
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
                    <Select
                        styles={selectStyle}
                        placeholder={'Введите или выберите категорию'}
                        options={props.subCategories}
                        value={props.subCategory}
                        onChange={props.setSubCategory}
                    />
                </div>
                <div>
                    <div className={css.filterCategory}>Виды</div>
                    <Select
                        styles={selectStyle}
                        placeholder={'Введите или выберите категорию'}
                        options={props.typesOption}
                        value={props.types}
                        onChange={props.setTypes}
                    />
                </div>
            </div>
        </div>
    )
}

export default Articles

type SearchProps = {
    value: string
    setValue: any
}
export const Search: React.FC<SearchProps> = (props) => {
    return (
        <div className={css.search}>
            <label>
                <ArticleSearch/>
                <input type="text" placeholder={'поиск'}
                       value={props.value} onChange={props.setValue}
                       className={css.submit2}/>
                <input type="submit" placeholder={''} value={''} className={css.submit}/>
            </label>
        </div>
    )
}