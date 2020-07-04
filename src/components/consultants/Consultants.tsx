import React, {useEffect, useState} from 'react'
import css from './cnsultant.module.css'
import ConsultantCard from "../consultantCard/ConsultantCard";
import api from '../../api/Api'

type Props = {

}
const Consultants: React.FC<Props> = (props) => {
    const [consultants, setConsultants] = useState([])
    useEffect(()=>{
        api.getConsultants(1).then((res:any) => {
            console.log(res)
            setConsultants(res.data)
        })
    }, [])
    return (
        <div className={css.wrapper}>
            <div className={css.header}>
                Наши Консультанты
            </div>
            <div className={css.filters}>
                <div className={css.filter_by}>Фильтрация по </div>
                <div className={css.remove_all}>Сбросить всё</div>
            </div>
            <div className={css.categories}>
                <div className={css.category}>Категория</div>
                <select className={css.categoryList}>
                    <option value="1">Культура</option>
                </select>
            </div>
            <div className={css.cardWrapper}>
                {
                    consultants.map((item:any) => <ConsultantCard
                        description={item.description}
                        name={item.user.first_name}
                        last_name={item.user.last_name}
                        url={item.user.photo}
                        key={item.id}
                    /> )
                }
            </div>
        </div>
    )
}

export default Consultants