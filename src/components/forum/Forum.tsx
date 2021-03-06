import React, { useEffect, useState } from 'react'
import { Header, Wrapper } from "../Styles";
import {
    FormWrapper,
    Input,
    Button,
    QuestionWrappers,
    AnswerWrapper,
    ImageWrapper,
    Text,
    Answers,
    Search, FilterWrapper
} from "./forum-styles";
import { Link } from "react-router-dom";
import api from '../../api/Api'
import Preloader from "../preloader/Preloader";
import Pagination from "../pagination/Pagination";
import noPicture from '../../img/noPicture.png'
import Footer from "../footer/Footer";
import { GlobalStateType } from "../../state/root-reducer";
import { getCategories } from '../../state/selectors'
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

// const colourStyles = {
//     control: (styles: any) => ({
//         ...styles,
//         minWidth: '200px',
//         border: 'none',
//         marginLeft: '20px',
//         '&:focus': {
//             outline: 'none !important',
//             borderColor: 'none',
//             border: 'none'
//         }
//     }),
//     dropdownIndicator: (styles:any) => ({
//         ...styles,
//         display: 'none'
//     }),
//     indicatorSeparator:(styles:any) => ({
//         ...styles,
//         display: 'none'
//     }),
//     option: (styles: any) => {
//         return {...styles, marginLeft: '20px'}
//     }
// };

type Props = {
    categories?: any
}
const Forum: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    // const categories = props.categories.map((item: any) => {
    //     return {
    //         value: item.id,
    //         label: item.title
    //     }
    // })

    const [questions, setQuestions] = useState([])
    const [pending, setPending] = useState(true)
    const [pagination, setPagination] = useState(0)
    const [page, setPage] = useState(1)
    const [text, setText] = useState('')
    const [filter, setFilter] = useState<{ value: number, label: string } | null>(null)

    useEffect(() => {
        api.getForums(page)
            .then(
                (res: any) => {
                    setQuestions(res.data.results)
                    setPagination(Math.ceil(res.data.count / res.data.limit))
                    setPending(false)
                },
                (error: string) => {
                    alert(error)
                }
            )
    }, [page])
    const submit = (e: any) => {
        e.preventDefault()
        api.getForums(1, text, filter)
            .then(
                (res: any) => {
                    setQuestions(res.data.results)
                    setPagination(Math.ceil(res.data.count / res.data.limit))
                    setPending(false)
                },
                (error: string) => {
                    alert(error)
                }
            )
    }

    const removeAll = () => {
        setFilter(null)
        setText('')
        api.getForums(1, text, filter)
            .then(
                (res: any) => {
                    setQuestions(res.data.results)
                    setPagination(Math.ceil(res.data.count / res.data.limit))
                    setPending(false)
                },
                (error: string) => {
                    alert(error)
                }
            )
    }
    if (pending) {
        return <Preloader />
    }
    return (
        <>
            <Wrapper>
                <Header>Форум</Header>
                <Search>
                    <FormWrapper onSubmit={submit}>
                        <Input value={text} onChange={(e: any) => setText(e.target.value)}
                            placeholder={t('questionText')} type="text" />
                        <Button>{t('search')}</Button>
                    </FormWrapper>
                    <Link to={'/add-question'}>
                        <Button>{t('question?')}</Button>
                    </Link>
                </Search>
                <FilterWrapper>
                    {/*<FilterBy>*/}
                    {/*    Фильтровать по*/}
                    {/*    <Select value={filter} onChange={(e:any)=>setFilter(e)} options={categories}  placeholder={''} isSearchable={true} styles={colourStyles}/>*/}
                    {/*</FilterBy>*/}
                    <span />
                    <div onClick={removeAll}>
                        {t('clean')}
                    </div>
                </FilterWrapper>
                <QuestionWrappers>
                    {
                        questions.map((item: any, index: number) => {
                            if (index === questions.length - 1) {
                                return <Question img={item.user.photo} comment_count={item.comment_count} key={item.id} id={item.id}
                                    title={item.title} last={true} />
                            }
                            return <Question img={item.user.photo} comment_count={item.comment_count} key={item.id} id={item.id}
                                title={item.title} />
                        })
                    }
                </QuestionWrappers>
                <Pagination setPage={setPage} pageCount={pagination} />
            </Wrapper>
            <Footer />
        </>
    )
}

type QuestionProps = {
    last?: boolean
    noAnswer?: boolean
    title: string
    id: number
    comment_count: number
    img: string
}

export const Question = (props: QuestionProps) => {
    const { t } = useTranslation();
    return (
        <Link to={`/answer/${props.id}`}>
            <AnswerWrapper style={{
                borderBottom: props && props.last ? 'none' : undefined
            }}>
                <ImageWrapper>
                    <Text>
                        <img src={props.img ? props.img : noPicture} alt="#" />
                    </Text>
                    <span>{props.title}</span>
                </ImageWrapper>
                {
                    !props.noAnswer ?
                        <Answers>
                            <div>
                                {props.comment_count}
                            </div>
                            <p>
                                {t('answer')}
                            </p>
                        </Answers>
                        : <span />
                }
            </AnswerWrapper>
        </Link>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        categories: getCategories(state)
    }
}

export default connect(mapStateToProps, null)(Forum)