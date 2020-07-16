import React from 'react'
import {NavBarElement, NavBarWrapper} from "./NavBarElements";
import drop from '../../img/dropDown.png'
import {Link} from "react-router-dom";
type OwnProps = {

}
const NavBar = (props: OwnProps) =>{
    return (
        <NavBarWrapper>
            <Link to={'articles'}>
            <NavBarElement>
                Культура
                <img src={drop} alt="#"/>
            </NavBarElement>
            </Link>
            <NavBarElement>
                Технологии выращивания
                <img src={drop} alt="#"/>
            </NavBarElement>
            <NavBarElement>Профилактика
                <img src={drop} alt="#"/>
            </NavBarElement>
            <NavBarElement>Инновации
                <img src={drop} alt="#"/>
            </NavBarElement>
            <NavBarElement>Органика
                <img src={drop} alt="#"/>
            </NavBarElement>
        </NavBarWrapper>
    )
}


export default NavBar
