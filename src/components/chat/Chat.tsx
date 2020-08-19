import React, {useEffect, useRef, useState} from "react";
import css from "./chat.module.css";
import send from '../../img/Mask.png';
import plus from '../../img/plus.png';
import noPic from "../../img/noPicture.png";
import Api from "./../../api/Api";
import {Time} from "../functions/time";
import {useDispatch} from "react-redux";
import {checkToken} from "../../state/authReducer";

type ChatType = {
    id: number
}
const Chat: React.FC<ChatType> = ({id}) => {
    let [rooms, setRooms] = useState<any>([])
    const [current, setCurrent] = useState(0)
    const [email, setEmail] = useState('');
    useEffect(() => {
        Api.getRooms().then((res: any) => {
                let data = res.data.map((item: any) => {
                    item.user = item.first.id != id ? "first" : "second";
                    return item;
                })
                setRooms(data);
            }
        );
    }, [])

    return (
        <div className={css.chatWrapper}>
            <div>
                <div className={css.searchWrapper}>
                    <input type="text" placeholder={'искать'}/>
                </div>
                <div className={css.userList}>
                    {
                        rooms.map((item: any) => <User
                            current={current}
                            key={item.id}
                            id={item.id}
                            setCurrent={setCurrent}
                            setEmail={setEmail}
                            email={item[item.user].email}
                            time={item.timestamp} image={item[item.user].photo}
                            name={item[item.user].first_name + ' ' + item[item.user].last_name}/>)
                    }
                </div>
            </div>
            <div>
                {
                    current
                        ? <MessageBlock userId={id} id={current} email={email}/>
                        : <div>Выберите чат что бы начать переписку.</div>
                }
            </div>
        </div>
    )
}

export default Chat

type UserProps = {
    name: string
    image: string
    time: string
    setCurrent: any
    id: number
    email: string
    setEmail: any;
    current: number
}
const User = (props: UserProps) => {
    return (
        <div className={props.current === props.id ? css.activeUser + ' ' + css.personWrapper : css.personWrapper}
             onClick={() => {
                 props.setCurrent(props.id);
                 props.setEmail(props.email);
             }}>
            <div className={css.person}>
                <div className={css.person}>
                    <img src={props.image ? props.image : noPic} alt="#" className={css.personImg}/>
                    <div className={css.personName}>{props.name}</div>
                </div>
                <div className={css.peronTime}>{Time(props.time)}</div>
            </div>
            <div className={css.textWrapper}>
                <div>
                    {/*Отвечать моментально считается необязательным в бизнес-переписке, в конце концов, электронная почта*/}
                    {/*– это не мессенджер. Но лучше не задерживайте ответ дольше, чем на 24 часа.*/}
                </div>
                <span className={css.count}>
                    <span>
                        1
                    </span>
                </span>
            </div>
        </div>
    )
}
type MessageProps = {
    id: number
    userId: number
    email: string
}
const MessageBlock: React.FC<MessageProps> = ({id, ...props}) => {
    const dispatch = useDispatch()

    const [inp, setInp] = useState('')
    const [data, setData] = useState<any>(null)
    const [user, setUser] = useState<any>(null)
    const [messages, setMessages] = useState<any>([])
    const messageId: any = useRef(null)

    const Send = async (req: any) => {
        return dispatch(checkToken(() => req))
    }
    const scrollToBottom = () => {
        const scrollHeight = messageId.current.scrollHeight;
        const height = messageId.current.clientHeight;
        messageId.current.scrollTop = scrollHeight - height;
    }

    const submit = (e: any) => {
        e.preventDefault()
        Send(Api.sendMessage(props.email, {message: inp}))
            .then((res: any) => {
                let a = {
                    ...res.data,
                    user: props.userId,
                }
                setMessages([...messages, a])
                setInp('')
                scrollToBottom()
            })
    }


    const getRoom = (scroll?: boolean) => {
        Send(Api.getRooms(id))
            .then((res: any) => {
                setData(res.data)
                setMessages(res.data.messages)
                if (+res.data.first.id === +props.userId) {
                    setUser(res.data.second)
                } else {
                    setUser(res.data.first)
                }
                scrollToBottom()
            })
    }
    useEffect(() => {
        getRoom(true)
    }, [id])

    useEffect(() => {
        let a = setInterval(() => getRoom(), 5000)
        return () => clearInterval(a)
    }, [id])
    return (
        <div className={css.message__wrapper}>
            <div className={css.chatHeader}>
                <div>
                    <div className={css.avaWrapper}>
                        <img src={user?.photo ? user.photo : noPic} alt="#"/>
                    </div>
                    <div className={css.personName}>{user?.first_name + ' ' + user?.last_name}</div>
                </div>
                <div>
                    <button>A</button>
                    <button>B</button>
                </div>
            </div>
            <div ref={messageId} className={css.messages}>
                {
                    messages
                        ? messages?.map((item: any) => <div key={item.id}
                                                            className={item.user === props.userId ? css.myMessageWrapper : css.messageWrapper}>
                            <div className={item.user === props.userId ? css.myMessage : css.message}>{item.message}</div>
                        </div>)
                        : null
                }
            </div>
            <form onSubmit={submit} className={css.message__input}>
                <input placeholder={'Введите ваше сообщение'} value={inp} onChange={(e) => setInp(e.target.value)}
                       type="text"/>
                <span className={css.plus}>
                    <img src={plus} alt="+"/>
                </span>
                <span onClick={submit} className={css.send}>
                    <img src={send} alt="send"/>
                </span>
            </form>
        </div>
    )
}