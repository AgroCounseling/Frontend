import React, { useEffect, useState } from 'react'
import api from '../../api/Api'
import { useSelector } from "react-redux";
import { GlobalStateType } from "../../state/root-reducer";
import ConsultantCard from "../consultantCard/ConsultantCard";
import { getSpecialties } from "../../state/selectors";
import css from './search.module.css'
import { Header } from "../Styles";
import { useTranslation } from "react-i18next";
import { QuestionWrappers } from "../forum/forum-styles";
import { Question } from "../forum/Forum";
import NoElement from "../../utils/NoElement";
import { Article } from "../articles/Articles";
import Preloader from "../preloader/Preloader";


const Search = () => {
    const { t } = useTranslation();
    const str = useSelector((state: GlobalStateType) => state.app.search)
    const specialties = useSelector((state: GlobalStateType) => getSpecialties(state))
    const [articles, setArticles] = useState<any>(null)
    const [consultants, setConsultants] = useState<any>(null)
    const [forum, setForum] = useState<any>(null)
    const [pending, setPending] = useState(true)


    useEffect(() => {
        setPending(true)
        api.getContent(str)
            .then((res) => {
                setArticles(res.data.results.Article)
                setForum(res.data.results.Forum)
                setConsultants(res.data.results.Consultant)
                setPending(false)
            })
    }, [str])

    if (pending) {
        return <Preloader />
    }
    return (
        <div className={css.wrapper}>
            <Header>
                {t('consultants')}
            </Header>
            {
                consultants?.length ?
                    <div className={css.cardWrapper}>{
                        consultants?.map((item: any) => <ConsultantCard
                            id={item.id}
                            star={item.middle_star}
                            description={item.description}
                            name={item.user.first_name}
                            last_name={item.user.last_name}
                            url={item.user.photo}
                            specialization={item.specialty.map((item: any) => specialties.find((i: any) => item.category === i.id ? i.title : null))}
                            key={item.id}
                        />)
                    }</div>
                    : <NoElement text={t('noConsultant')} />
            }
            <Header>Форум</Header>
            {
                forum?.length ?
                    <QuestionWrappers>
                        {
                            forum?.map((item: any, index: number) => {
                                if (index === forum.length - 1) {
                                    return <Question noAnswer={true} comment_count={item.comment_count} key={item.id}
                                        id={item.id}
                                        title={item.title} last={true} />
                                }
                                return <Question noAnswer={true} comment_count={item.comment_count} key={item.id}
                                    id={item.id}
                                    title={item.title} />
                            })
                        }
                    </QuestionWrappers>
                    : <NoElement text={t('noQuestion')} />
            }
            <Header>Статьи</Header>
            {
                articles?.length ? articles?.map((item: any) => <Article
                    newUrl={'/article-detail'}
                    key={item.id}
                    id={item.id}
                    description={item.text}
                    title={item.title}
                    date={item.pub_date}
                    name={item.user.first_name + ' ' + item.user.last_name}
                    category={item.category}
                />)

                    : <NoElement text={t('noArticles')} />
            }
        </div>
    )
}


export default Search