import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Preloader from "../preloader/Preloader";
import Footer from "../footer/Footer";
import css from './consultant.module.css'
import api from '../../api/Api'
import noPicture from '../../img/noPicture.png'
import Stars from './Stars'
<<<<<<< HEAD
import { GlobalStateType } from "../../state/root-reducer";
import { getSpecialties } from "../../state/selectors";
import { connect } from "react-redux";
=======
import {GlobalStateType} from "../../state/root-reducer";
import {getSpecialties} from "../../state/selectors";
import {connect} from "react-redux";
>>>>>>> fbd1e4df4d1ebfed5bc4a9f030ef29cc331a91a7

type Props = {
    specialties: any
}
const Consultant: React.FC<Props> = (props) => {
    const params: { id?: string | undefined } = useParams()
    const [pending, setPending] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [specialties, setSpecialties] = useState<any>([])
    useEffect(() => {
        api.getUser(params.id)
            .then((res: any) => {
<<<<<<< HEAD
=======
                console.log(res)
>>>>>>> fbd1e4df4d1ebfed5bc4a9f030ef29cc331a91a7
                setUser(res.data)
                let arr = res.data.specialty.map((item: any) => props.specialties.find((i: any) => item.category === i.id ? i.title : null))
                setSpecialties(arr)
                setPending(false)
            })
    }, [params.id, props.specialties])
    if (pending) {
<<<<<<< HEAD
        return <Preloader />
    }
    return (
        <div className={css.wrapper}>
            <div className={css.feedBack}>
                <span>
                    {
                        user.reviews.map((item: any) => <Answer name={item.name} answer={item.text} date={'16 мая'} stars={2.5} />)
                    }
                </span>
            </div>
            <div className={css.user}>
                <div className={css.imgWrapper}>
                    <img src={noPicture} alt="NoPicture" />
=======
        return <Preloader/>
    }
    return (
        <>
            <div className={css.wrapper}>
                <div className={css.feedBack}>
                    <span>
                        {
                            user.reviews.map((item: any) => <Answer key={item.id} name={item.name} answer={item.text} date={'16 мая'}
                                                                    stars={2.5}/>)
                        }
                        {/*<Answer name={'test name'} answer={'sdfsdf sdgsdg asgsdg'} date={'16 мая'} stars={2.5}/>*/}
                        {/*<Answer name={'test name'} answer={'sdfsdf sdgsdg asgsdg'} date={'16 мая'} stars={2.5}/>*/}
                        {/*<Answer name={'test name'} answer={'sdfsdf sdgsdg asgsdg'} date={'16 мая'} stars={2.5}/>*/}
                        {/*<Answer name={'test name'} answer={'sdfsdf sdgsdg asgsdg'} date={'16 мая'} stars={2.5}/>*/}
                        {/*<Answer name={'test name'} answer={'sdfsdf sdgsdg asgsdg'} date={'16 мая'} stars={2.5}/>*/}
                    </span>
>>>>>>> fbd1e4df4d1ebfed5bc4a9f030ef29cc331a91a7
                </div>
                <div>
                    <div className={css.user}>
                        <div className={css.imgWrapper}>
                            <img src={noPicture} alt="NoPicture"/>
                        </div>
                        <div className={css.userInfo}>
                            <div className={css.person}>
                                <div className={css.nameWrapper}>
                                    <div className={css.name}>{user.user.first_name} {user.user.last_name}</div>
                                </div>
                                <div className={css.specialty}>Cпециальность: {
                                    specialties.map((item: any) => <span key={item.id}> {item.title}, </span>)
                                }</div>
                            </div>
                            <Stars color={'red'} edit={false} size={44} value={3.5}/>
                        </div>
                    </div>
                    <div>
                        <div className={css.education}>Образование</div>
                        <div className={css.text}>{user.description}</div>
                    </div>
<<<<<<< HEAD
                    <div className={css.specialty}>Cпециальность: {
                        specialties.map((item: any) => <span key={item.id}> {item.title}, </span>)
                    }</div>
                </div>
            </div>
            <div className={css.textWrapper}>
                <div className={css.education}>Образование</div>
                <div className={css.text}>{user.description}</div>
            </div>
            <div style={{ marginTop: "100%" }}>
                <Footer />
            </div>
        </div>
=======
                </div>
            </div>
            <Footer/>
        </>
>>>>>>> fbd1e4df4d1ebfed5bc4a9f030ef29cc331a91a7
    )
}

type AnswerProps = {
    name: string
    answer: string
    stars: number
    date: string
}
const Answer: React.FC<AnswerProps> = (props) => {
    return (
        <div className={css.answerWrapper}>
            <div className={css.answerName}>{props.name}</div>
            <div className={css.answer}>{props.answer}</div>
            <div className={css.stars}>
                <Stars edit={true} color={'#ffd700'} size={24} value={props.stars}/>
                <div>{props.date}</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        specialties: getSpecialties(state)
    }
}
export default connect(mapStateToProps, {})(Consultant)