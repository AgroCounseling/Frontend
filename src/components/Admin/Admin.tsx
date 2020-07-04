import React from 'react'
import {WithNotAuthRedirect} from "../../hocs/AuthHoc";

const Admin = () => {
    return (
        <div>
            Admin
        </div>
    )
}

export default WithNotAuthRedirect(Admin)