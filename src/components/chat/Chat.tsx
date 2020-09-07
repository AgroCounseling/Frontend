import React, { useEffect, useRef, useState } from "react";
import css from "./chat.module.css";
import { Time } from "../functions/time";
import { useDispatch } from "react-redux";
import { checkToken } from "../../state/authReducer";
import { useTranslation } from "react-i18next";
import Api from "./../../api/Api";
import send from '../../img/Mask.png';
import plus from '../../img/plus.png';
import noPic from "../../img/noPicture.png";
import imgIcon from "./../.../../../assets/icons/Image-512.webp";
// import audioImg from "./../../assets/icons/high-volume.png";
import videoImg from "./../../assets/icons/23.Videos-512.png"
import close from '../../img/close.png'
import audioMessage from "./../../assets/icons/uuu2.png";
import useRecorder from "./useRecorder";
import Modal from "../modalWindow/modal";

type ChatType = {
    id: number
}
const Chat: React.FC<ChatType> = ({ id }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const checkRequest = async (req: any) => {
        return dispatch(checkToken(() => req))
    }
    let [rooms, setRooms] = useState<any>([])
    const [current, setCurrent] = useState(0)
    const [email, setEmail] = useState('');
    const getFriends = () => {
        checkRequest(Api.getRooms())
            .then((res: any) => {
                let data = res.data.map((item: any) => {
                    item.user = +item.first.id !== +id ? "first" : "second";
                    return item;
                })
                setRooms(data);
            }
            );
    }
    useEffect(() => {
        getFriends()
    }, [])
    useEffect(() => {
        let a = setInterval(() => getFriends(), 6000)
        return () => clearInterval(a)
    }, [id])
    return (
        <div className={css.chatWrapper}>
            <div>
                <div className={css.searchWrapper}>
                    <input type="text" placeholder={t('search')} />
                </div>
                <div className={css.userList}>
                    {
                        rooms.map((item: any) => <User
                            current={current}
                            key={item.id}
                            id={item.id}
                            setCurrent={setCurrent}
                            messages={item.new_messages}
                            setEmail={setEmail}
                            email={item[item.user].email}
                            time={item.timestamp} image={item[item.user].photo}
                            name={item[item.user].first_name + ' ' + item[item.user].last_name} />)
                    }
                </div>
            </div>
            <div>
                {
                    current
                        ? <MessageBlock userId={id} id={current} email={email} />
                        : <div>{t('selectChatText')}</div>
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
    messages: string
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
                    <img src={props.image ? props.image : noPic} alt="#" className={css.personImg} />
                    <div className={css.personName}>{props.name}</div>
                </div>
                <div className={css.peronTime}>{Time(props.time)}</div>
            </div>
            <div className={css.textWrapper}>
                <div> </div>
                {/*{*/}
                {/*    props.messages*/}
                {/*        ? <span className={css.count}>*/}
                {/*            <span>*/}
                {/*                {props.messages}*/}
                {/*            </span>*/}
                {/*        </span>*/}
                {/*        : null*/}
                {/*}*/}
            </div>
        </div>
    )
}

type MessageProps = {
    id: number
    userId: number
    email: string
}
const MessageBlock: React.FC<MessageProps> = ({ id, ...props }) => {
    const messageId: any = useRef(null)
    const Send = async (req: any) => dispatch(checkToken(() => req))

    const dispatch = useDispatch()
    let [audioURL, isRecording, startRecording, stopRecording, audioData, setAudioData]: any = useRecorder();

    const { t } = useTranslation();
    const [isModal, setIsModal] = useState(false)
    const [open, setOpen] = useState(false);
    const [downloadImg, setDownloadImg] = useState('');
    const [downloadVideo, setDownloadVideo] = useState('');
    const [openImgModal, setOpenImgModal] = useState(false);
    const [openAudioModal, setOpenAudioModal] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [inp, setInp] = useState('')
    const [userData, setData] = useState<any>(null)
    const [user, setUser] = useState<any>(null)
    const [messages, setMessages] = useState<any>([])
    const [img, setImg] = useState<any>(null)
    const [video, setVideo] = useState<any>(null)
    const [audio, setAudio] = useState<any>(null)
    const [picture, setPicture] = useState('')
    const [endTime, setEndTime] = useState(false)
    let time: any;
    let minutes: any;
    let access2: any;
    const scrollToBottom = () => {
        const scrollHeight = messageId?.current?.scrollHeight;
        const height = messageId?.current?.clientHeight;
        if (messageId.current) messageId.current.scrollTop = scrollHeight - height
    }
    const submit = (e: any) => {
        e.preventDefault()
        const newForm = new FormData()
        newForm.append('message', inp)
        if (video) newForm.append('video', video)
        if (img) newForm.append('image', img)
        if (audioData) { // @ts-ignore
            newForm.append('audio', audioData)
        }
        if (audio) { // @ts-ignore
            newForm.append('audio', audio)
        }

        Send(Api.sendMessage(props.email, newForm))
            .then((res: any) => {
                let a = {
                    ...res.data,
                    user: props.userId,
                }
                setMessages([...messages, a])
                setInp('')
                setVideo(null)
                setImg(null)
                setAudio(null)
                setAudioData(null)
                setOpenAudioModal(false);
                setOpenImgModal(false);
                setOpenVideoModal(false);
                setDownloadImg('');
                scrollToBottom()
            })
    }

    useEffect(()=>{
        setIsModal(false)
        setOpen(false)
        setDownloadImg('')
        setDownloadVideo('')
        setOpenImgModal(false)
        setOpenAudioModal(false)
        setOpenVideoModal(false)
        setInp('')
        setData(null)
        setUser(null)
        setMessages([])
        setImg(null)
        setVideo(null)
        setAudio(null)
        setPicture('')
        // setEndTime(false)
    }, [id])
    const getRoom = (scroll?: boolean) => {
        let data = JSON.parse(localStorage.getItem('userData') as string);
        Send(Api.getRooms(id))
            .then((res: any) => {
                let time = res.data.time
                let isAccess = res.data.access
                setEndTime(!isAccess)
                console.log(res.data)
                // setAccess(res.data.access)
                setData({ ...res.data });
                if ((new Date() <= new Date(res.data.times_rooms))) {
                    setEndTime(true);
                } else {
                    setEndTime(false);
                    if (data.status_client && isAccess) {
                        setIsModal(true)
                    }
                    Send(Api.editStatus(id, {
                        access: false,
                        time: 0
                    })).then((res: any) => {
                        // setEndTime(false)
                    })
                }
                access2 = res.data.access
                minutes = res.data.time
                setMessages(res.data.messages)
                if (+res.data.first.id === +props.userId) {
                    setUser(res.data.second)
                } else {
                    setUser(res.data.first)
                }
                if (scroll) {
                    scrollToBottom()
                }
            }, (error: any) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getRoom(true)
    }, [id])

    useEffect(() => {
        let interval = setInterval(() => getRoom(), 5000)
        return () => clearInterval(interval);
    }, [id])
    const showImg = (str: string) => {
        setPicture(str)
    }
    return (
        <div className={css.message__wrapper}>
            <Modal closed={isModal} id={id} setClose={(e: boolean) => setIsModal(e)} />
            <div className={css.chatHeader}>
                <div>
                    <div className={css.avaWrapper}>
                        <img src={user?.photo ? user.photo : noPic} alt="#" />
                    </div>
                    <div className={css.personName}>{user?.first_name + ' ' + user?.last_name}</div>
                </div>
                <div>
                    {/*<button>A</button>*/}
                    {/*<button>B</button>*/}
                </div>
            </div>
            <div ref={messageId} className={css.messages}>
                {
                    messages
                        ? messages?.map((item: any) => <div key={item.id}
                            className={item.user === props.userId ? css.myMessageWrapper : css.messageWrapper}>
                            <div className={item.user === props.userId ? css.myMessage : css.message}>
                                {
                                    item?.image || item?.video || item?.audio ?
                                        <div className={css.fileWrapper}>
                                            {
                                                item?.image ? <>
                                                    <img
                                                        onClick={() => showImg(item.image)}
                                                        onBlur={() => showImg('')}
                                                        src={item.image}
                                                        alt="#"
                                                    />
                                                </> : null
                                            }
                                            {
                                                item?.video ? <video src={item.video} controls /> : null
                                            }
                                            {
                                                item?.audio ?
                                                    <audio src={item.audio} controls className={css.audio} /> : null
                                            }
                                        </div>
                                        : null
                                }
                                <div>{item.message}</div>
                            </div>
                        </div>)
                        : null
                }
                {
                    picture
                        ? <div className={css.modalImg}>
                            <span onClick={() => setPicture('')} className={css.close}><img src={close} alt="X" /></span>
                            <img src={picture} alt="#" />
                        </div>
                        : null
                }
            </div>
            {
                open ? <div className={css.open}>
                    <label>
                        <input onChange={(e: any) => {
                            setImg(e.target.files[0]);
                            setDownloadImg(URL.createObjectURL(e.target.files[0]));
                            setOpenImgModal(true);
                        }} accept="image/*" type="file"
                            style={{ display: 'none' }} />
                        <img src={imgIcon} alt="imgIcon" />
                    </label>
                    <label>
                        <input onChange={(e: any) => {
                            setVideo(e.target.files[0]);
                            setDownloadVideo(URL.createObjectURL(e.target.files[0]));
                            setOpenVideoModal(true);
                        }} accept="Video/*" type="file"
                            style={{ display: 'none' }} />
                        <img src={videoImg} alt="imgIcon" />
                    </label>
                    {/* <label>
                        <input onChange={(e: any) => setAudio(e.target.files[0])} accept="Audio/*" type="file"
                            style={{ display: 'none' }} />
                        <img src={audioImg} alt="imgIcon" />
                    </label> */}
                </div> : ""
            }
            {
                endTime ? <form onSubmit={submit} className={css.message__input}>
                    <input placeholder={t('postMessage')} value={inp} onChange={(e) => setInp(e.target.value)}
                        type="text" />
                    <label className={css.plus}>
                        <img src={plus} alt="+" onClick={() => setOpen(!open)} />
                    </label>

                    <span className={css.audioMessage} onClick={() => setOpenAudioModal(true)}>
                        <img src={audioMessage} alt="audioMessage" />
                    </span>
                    <span onClick={submit} className={css.send}>
                        <img src={send} alt="send" />
                    </span>
                </form>
                    : <div className={css.closed}>Ваше время истекло.</div>

            }
            {
                openImgModal ? <div className={"overlay"}>
                    <div className={"dialog p-1"}>
                        <div>
                            <img src={downloadImg} alt="downloadImg" className="downloadImg" />
                            <textarea placeholder={t('postMessage')} value={inp}
                                onChange={(e) => setInp(e.target.value)}
                                className="textarea" />
                            <div className="btnBlock">
                                <button
                                    className="send-btn"
                                    onClick={() => {
                                        setVideo(null)
                                        setImg(null)
                                        setAudio(null)
                                        setAudioData(null)
                                        setOpenAudioModal(false);
                                        setOpenImgModal(false);
                                        setOpenVideoModal(false);
                                        setDownloadImg('');
                                    }}
                                >
                                    Отмена
                                </button>
                                <button className="green-btn" onClick={submit}>Отправить</button>
                            </div>
                        </div>

                    </div>
                </div> : null
            }
            {
                openVideoModal ? <div className={"overlay"}>
                    <div className={"dialog p-1"}>
                        <div>
                            <video width="400" controls src={downloadVideo} />

                            <textarea placeholder={t('postMessage')} value={inp}
                                onChange={(e) => setInp(e.target.value)}
                                className="textarea" />
                            <div className="btnBlock">
                                <button
                                    className="send-btn"
                                    onClick={() => {
                                        setVideo(null)
                                        setImg(null)
                                        setAudio(null)
                                        setAudioData(null)
                                        setOpenAudioModal(false);
                                        setOpenImgModal(false);
                                        setOpenVideoModal(false);
                                        setDownloadImg('');
                                    }}
                                >
                                    Отмена
                                </button>
                                <button className="green-btn" onClick={submit}>Отправить</button>
                            </div>
                        </div>

                    </div>
                </div> : null
            }
            {
                openAudioModal ? <div className={"overlay"}>
                    <div className={"dialog p-1"}>
                        <div>
                            <div className={css.audioBlock}>
                                <audio src={audioURL} controls />
                                <button onClick={startRecording}
                                    disabled={isRecording}
                                    className={css.writeDown}>
                                    Записать
                                </button>
                                <button onClick={stopRecording}
                                    disabled={!isRecording}
                                    className={css.stopDown}>
                                    Остановит
                                </button>
                            </div>

                            <textarea placeholder={t('postMessage')} value={inp}
                                onChange={(e) => setInp(e.target.value)}
                                className="textarea" />
                            <div className="btnBlock">
                                <button
                                    className="send-btn"
                                    onClick={() => {
                                        setVideo(null)
                                        setImg(null)
                                        setAudio(null)
                                        setAudioData(null)
                                        setOpenAudioModal(false);
                                        setOpenImgModal(false);
                                        setOpenVideoModal(false);
                                        setDownloadImg('');
                                    }}
                                >
                                    Отмена
                                </button>
                                <button className="green-btn" onClick={submit}>Отправить</button>
                            </div>
                        </div>

                    </div>
                </div> : null
            }
        </div>
    )
}