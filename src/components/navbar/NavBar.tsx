import React from 'react'
import {NavBarElement, NavBarWrapper} from "./NavBarElements";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCategories} from "../../state/selectors";
import {GlobalStateType} from "../../state/root-reducer";

type OwnProps = {}
const NavBar = (props: OwnProps) =>{
    const categories = useSelector((state: GlobalStateType)=> getCategories(state))
    return (
        <NavBarWrapper>
            {
                categories.map((item:any)=> <Link key={item.id} to={`articles/${item.id}`}>
                    <NavBarElement>
                        {item.title}
                    </NavBarElement>
                </Link> )
            }
            {/*<Link to={'articles'}>*/}
            {/*<NavBarElement>*/}
            {/*    все статьи*/}
            {/*</NavBarElement>*/}
            {/*</Link>*/}
        </NavBarWrapper>
    )
}


export default NavBar
