import React from 'react'
import { Route, Routes } from "react-router-dom"
import Dashboard from './Dashboard'
import ForgotPass from './ForgotPass'
import Loginform from './Loginform'
import PrivateRoute from './PrivateRoute'
import Signup from './Signup'
import Test from './Test'
function Allroutes() {
    return (
        <>
            <Routes>
                <Route path='/' element={<h1>home</h1>}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/login' element={<Loginform />}></Route>
                <Route path='/dashboard' element={<PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
                }></Route>
                <Route path='/forgot' element={<ForgotPass />}></Route>
                <Route path='/test' element={<Test/>}></Route>

            </Routes>

        </>
    )
}

export default Allroutes