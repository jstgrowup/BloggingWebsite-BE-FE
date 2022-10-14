import React, { useState } from 'react'
import { createContext } from 'react'
export const Authcontext = createContext()
function AuthContextProvider({ children }) {
    const [first, setfirst] = useState([])
    return (

        <Authcontext.Provider value={first}>
            {children}
        </Authcontext.Provider>
    )
}

export default AuthContextProvider