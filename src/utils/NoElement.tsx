import React from 'react'
import css from './utils.module.css'


type Props = {
    text: string
}
const NoElement = (props:Props) => {
    return (
        <div className={css.noElement__wrapper}>
            <span> {props.text} </span>
        </div>
    )
}

export default NoElement

export const NoOption = (str:string) =>{
    return str
}