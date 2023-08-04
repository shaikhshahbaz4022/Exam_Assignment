import React from 'react'
import Login from '../components/Login'
import Instructor from '../components/Instructor'
import Admin from '../components/Admin'


const UserPrivateRoutes = ({ children }) => {

    const userToken = JSON.parse(localStorage.getItem("usersToken")) || ""
    console.log(userToken.role, userToken.token)
    return userToken.token ?                        // If userToken.token exists and is truthy
        userToken.role === 'instructor' ?      // If userToken.role is 'instructor'
            <Instructor /> :                    // If true, render <Instructor />
            userToken.role === 'admin' ?        // If false, check if userToken.role is 'admin'
                <Admin /> :                       // If true, render <Admin />
                children :                        // If false, render `children` (assuming children is another component)
        <Login />;;

}

export default UserPrivateRoutes
