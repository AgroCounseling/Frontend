import React from 'react'
import {NavBarElement, NavBarWrapper} from "./NavBarElements";
import drop from '../../img/dropDown.png'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCategories} from "../../state/selectors";
import {GlobalStateType} from "../../state/root-reducer";
type OwnProps = {

}
const NavBar = (props: OwnProps) =>{
    const categories = useSelector((state: GlobalStateType)=> getCategories(state))
    console.log(categories)
    return (
        <NavBarWrapper>
            {
                categories.map((item:any)=> <Link to={`articles/${item.id}`}>
                    <NavBarElement>
                        {item.title}
                        {/*<img src={drop} alt="#"/>*/}
                    </NavBarElement>
                </Link> )
            }
            <Link to={'articles'}>
            <NavBarElement>
                все статьи
                {/*<img src={drop} alt="#"/>*/}
            </NavBarElement>
            </Link>
            {/*<NavBarElement>*/}
            {/*    Технологии выращивания*/}
            {/*    <img src={drop} alt="#"/>*/}
            {/*</NavBarElement>*/}
            {/*<NavBarElement>Профилактика*/}
            {/*    <img src={drop} alt="#"/>*/}
            {/*</NavBarElement>*/}
            {/*<NavBarElement>Инновации*/}
            {/*    <img src={drop} alt="#"/>*/}
            {/*</NavBarElement>*/}
            {/*<NavBarElement>Органика*/}
            {/*    <img src={drop} alt="#"/>*/}
            {/*</NavBarElement>*/}
        </NavBarWrapper>
    )
}


export default NavBar
