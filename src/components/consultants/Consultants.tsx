import React, { useEffect, useState } from 'react'
import css from './cnsultant.module.css'
import ConsultantCard from "../consultantCard/ConsultantCard";
import api from '../../api/Api'
import { Header } from "../Styles";
import Select from 'react-select'
import Pagination from "../pagination/Pagination";
import { GlobalStateType } from "../../state/root-reducer";
import { connect } from "react-redux";
import { getCategories, getSpecialties } from "../../state/selectors";
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";

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


type Props = {
    categories: any
    specialties: any
}
const Consultants: React.FC<Props> = (props) => {
    const { t } = useTranslation();

    const history = useHistory();
    const params: { id: string } = useParams()
    const categories = props.specialties.map((item: any) => {
        return {
            value: item.id,
            label: item.title
        }
    })
    const [consultants, setConsultants] = useState([])
    const [pagination, setPagination] = useState(1)
    const [page, setPage] = useState(1)
    const [select, setSelect] = useState<any>(null)

    useEffect(() => {
        if (params.id) {
            api.getConsultants(params.id, page).then((res: any) => {
                setPagination(Math.ceil(res.data.count / res.data.limit))
                setConsultants(res.data.results)
            })
        } else {
            api.getConsultantsList(page)
                .then((res: any) => {
                    setPagination(Math.ceil(res.data.count / res.data.limit))
                    setConsultants(res.data.results)
                })
        }
        categories.forEach((item: any) => +params.id === +item.value ? setSelect(item) : null)
    }, [params.id, page])

    const selectChange = (e: { value: number, title: string }) => {
        setSelect(e)
        setPage(1)
        history.push(`${e.value}`)
    }
    // useEffect(() => {
    //     if(params.id){
    //         api.getConsultants(params.id, page).then((res: any) => {
    //             setPagination(Math.ceil(res.data.count / res.data.limit))
    //             setConsultants(res.data.results)
    //         })
    //     }else{
    //         api.getConsultantsList(page)
    //             .then((res: any) => {
    //                 setPagination(Math.ceil(res.data.count / res.data.limit))
    //                 setConsultants(res.data.results)
    //             })
    //     }
    // }, [page])

    const clean = () => {
        history.push('/consultants/')
        setSelect(null)
    }
    return (
        <div className={css.wrapper}>
            <Header>
                {t('consultants')}
            </Header>
            <div className={css.filters}>
                <div className={css.filter_by}>{t('filters')}</div>
                <div onClick={clean} className={css.remove_all}>{t("clean")}</div>
            </div>
            <div className={css.categories}>
                <div className={css.category}>{t('category')}</div>
                <Select options={categories} value={select} onChange={(e) => selectChange(e)} placeholder={'Введите или выберите категорию'} styles={colourStyles} />
            </div>
            <div className={css.cardWrapper}>
                {
                    consultants.map((item: any) => <ConsultantCard
                        id={item.id}
                        star={item.middle_star}
                        description={item.description}
                        name={item.user.first_name}
                        last_name={item.user.last_name}
                        url={item.user.photo}
                        specialization={item.specialty.map((item: any) => props.specialties.find((i: any) => item.category === i.id ? i.title : null))}
                        key={item.id}
                    />)
                }
            </div>
            <Pagination pageCount={pagination} setPage={setPage} />
        </div>
    )
}



const mapStateToProps = (state: GlobalStateType) => {
    return {
        categories: getCategories(state),
        specialties: getSpecialties(state)
    }
}
export default connect(mapStateToProps, {})(Consultants)