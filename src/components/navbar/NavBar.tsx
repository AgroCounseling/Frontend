import React from 'react'
import {NavBarElement, NavBarWrapper} from "./NavBarElements";
import drop from '../../img/dropDown.png'
type OwnProps = {

}
const NavBar = (props: OwnProps) =>{
    return (
        <NavBarWrapper>
            <NavBarElement>
                Культура
                <img src={drop} alt="#"/>
            </NavBarElement>
            <NavBarElement>Технологии выращивания
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
