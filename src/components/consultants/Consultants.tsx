import React, {useEffect, useState} from 'react'
import css from './cnsultant.module.css'
import ConsultantCard from "../consultantCard/ConsultantCard";
import api from '../../api/Api'
import {Header} from "../Styles";
import Select from 'react-select'
import Pagination from "../pagination/Pagination";
import ReactPaginate from "react-paginate";
import prev from '../../img/prev.png'
type Props = {}


const colourStyles = {
    control: (styles: any) => ({
        ...styles,
        backgroundColor: 'rgba(194, 199, 208, 0.4)',
        border: 'none',
        borderRadius: '10px',
        padding: '3px 5px',
        marginTop: '50px',

    }),
    // option: (styles:any) => {
    //     return {...styles,width:'350px'}
    // }
};

const Consultants: React.FC<Props> = (props) => {
    const [consultants, setConsultants] = useState([])
    useEffect(() => {
        api.getConsultants(1).then((res: any) => {
            console.log(res)
            setConsultants(res.data)
        })
    }, [])
    return (
        <div className={css.wrapper}>
            <Header>
                Наши Консультанты
            </Header>
            <div className={css.filters}>
                <div className={css.filter_by}>Фильтрация по</div>
                <div className={css.remove_all}>Сбросить всё</div>
            </div>
            <div className={css.categories}>
                <div className={css.category}>Категория</div>
                <Select placeholder={'Введите или выберите категорию'} styles={colourStyles}/>
            </div>
            <div className={css.cardWrapper}>
                {
                    consultants.map((item: any) => <ConsultantCard
                        star={item.middle_star}
                        description={item.description}
                        name={item.user.first_name}
                        last_name={item.user.last_name}
                        url={item.user.photo}
                        key={item.id}
                    />)
                }
            </div>
            <Pagination pageCount={1} />
        </div>
    )
}




export default Consultants