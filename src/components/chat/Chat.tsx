import React, {useEffect, useState} from "react";
import css from "./chat.module.css";
import send from '../../img/Mask.png';
import plus from '../../img/plus.png';
import noPic from "../../img/noPicture.png";
import Api from "./../../api/Api";
import {Time} from "../functions/time";

type ChatType = {
    id?: number
}
const Chat: React.FC<ChatType> = ({id}) => {
    let [rooms, setRooms] = useState<any>([])
    const [current, setCurrent] = useState(0)
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

    // console.log('rooms', rooms, id);
    return (
        <div className={css.chatWrapper}>
            <div>
                <div className={css.searchWrapper}>
                    <input type="text" placeholder={'искать'}/>
                </div>
                <div className={css.userList}>
                    {
                        rooms.map((item: any) => <User
                            key={item.id}
                            id={item.id}
                            setCurrent={setCurrent}
                            time={item.timestamp} image={item[item.user].photo}
                            name={item[item.user].first_name + ' ' + item[item.user].last_name}/>)
                    }
                </div>
            </div>
            <div>
                <MessageBlock id={current} />
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
}
const User = (props: UserProps) => {
    return (
        <div className={css.personWrapper} onClick={props.setCurrent(props.id)}>
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
    id:  number
}
const MessageBlock = (props: MessageProps) => {
    const [inp, setInp] = useState('')
    const submit = (e: any) => {
        e.preventDefault()
        Api.sendMessage('', {message: inp})
            .then((res) => {
                console.log(res)
            })
    }
    useEffect(()=>{
        Api.getRooms(props.id)
            .then((res)=>{
                console.log(res)
            })
    }, [])
    return (
        <div className={css.message__wrapper}>
            <div className={css.chatHeader}>
                <div>
                    <div className={css.avaWrapper}>
                        <img src={noPic} alt="#"/>
                    </div>
                    <div className={css.personName}>Аайза Аайза</div>
                </div>
                <div>
                    <button>A</button>
                    <button>B</button>
                </div>
            </div>
            <div className={css.messages}>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
                <div>messages</div>
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