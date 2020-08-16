import React, { useEffect, useState } from "react";
import css from "./chat.module.css";
import send from '../../img/Mask.png';
import plus from '../../img/plus.png';
import noPic from "../../img/noPicture.png";
import Api from "./../../api/Api";
type ChatType = {
    id?: number
}
const Chat: React.FC<ChatType> = ({ id }) => {
    let [rooms, setRooms] = useState([])
    useEffect(() => {
        Api.getRooms().then(res => setRooms(res.data));
    }, [])

    console.log(rooms, id);
    return (
        <div className={css.chatWrapper}>
            <div>
                <div className={css.searchWrapper}>
                    <input type="text" placeholder={'искать'} />
                </div>
                <div className={css.userList}>
                    {
                        rooms.map((item:any) => <User key={item.id} time={item.timestamp} image={item.second.photo} name={item.second.first_name + ' ' + item.second.last_name} />)
                    }
                </div>
            </div>
            <div>
                <MessageBlock />
            </div>
        </div>
    )
}

export default Chat

type UserProps = {
    name: string
    image: string
    time: string
}
const User = (props:UserProps) => {
    return (
        <div className={css.personWrapper}>
            <div className={css.person}>
                <div>
                    <img src={props.image ? props.image : noPic} alt="#" />
                </div>
                <div className={css.personName}>{props.name}</div>
                <div className={css.peronTime}>{props.time}</div>
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

const MessageBlock = () => {
    return (
        <div className={css.message__wrapper}>
            <div className={css.chatHeader}>
                <div>
                    <div className={css.avaWrapper}>
                        <img src={noPic} alt="#" />
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
            <div className={css.message__input}>
                <input placeholder={'Введите ваше сообщение'} type="text" />
                <span className={css.plus}>
                    <img src={plus} alt="+" />
                </span>
                <span className={css.send}>
                    <img src={send} alt="send" />
                </span>
            </div>
        </div>
    )
}