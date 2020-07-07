import React, {useEffect, useState} from 'react'
import {Header, Wrapper} from "../Styles";
import {
    FormWrapper,
    Input,
    Button,
    FilterBy,
    QuestionWrappers,
    AnswerWrapper,
    ImageWrapper,
    Text,
    Answers
} from "./forum-styles";
import {Link, Route} from "react-router-dom";
import api from '../../api/Api'
import Preloader from "../preloader/Preloader";
import Pagination from "../pagination/Pagination";
import noPicture from '../../img/noPicture.png'
import Footer from "../footer/Footer";

const Forum = () => {
    const [questions, setQuestions] = useState([])
    const [pending, setPending] = useState(true)
    useEffect(() => {
        api.getForums()
            .then(
                (res: any) => {
                    setQuestions(res.data)
                    setPending(false)
                },
                (error: any) => {
                    alert(error)
                }
            )
    }, [])
    if (pending) {
        return <Preloader/>
    }
    return (
        <>
            <Wrapper>
                <Header>Форум</Header>
                <FormWrapper>
                    <Input placeholder={'Введите ваш вопрос.......'} type="text"/>
                    <Button>Искать</Button>
                </FormWrapper>
                <FilterBy>Фильтровать по</FilterBy>
                <QuestionWrappers>
                    {
                        questions.map((item: any, index: number) => {
                            if (index === questions.length - 1) {
                                return <Question key={item.id} id={item.id} title={item.description} last={true}/>
                            }
                            return <Question key={item.id} id={item.id} title={item.description}/>
                        })
                    }
                </QuestionWrappers>
                <Pagination pageCount={1}/>
            </Wrapper>
            <Footer/>
        </>
    )
}

type QuestionProps = {
    last?: true
    title: string
    id: number
}

const Question = (props: QuestionProps) => {
    return (
        <Link to={`/answer/${props.id}`}>
            <AnswerWrapper style={{
                borderBottom: props && props.last ? 'none' : undefined
            }}>
                <ImageWrapper>
                    <Text>
                        <img
                            src={noPicture}
                            alt="#"/>
                    </Text>
                    <span>{props.title}</span>
                </ImageWrapper>
                <Answers>
                    <div>
                        1
                    </div>
                    <p>
                        ответ
                    </p>
                </Answers>
            </AnswerWrapper>
        </Link>
    )
}

export default Forum