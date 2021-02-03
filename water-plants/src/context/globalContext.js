import React, {createContext, useContext,useState} from 'react'

export const GlobalContext = createContext()
const ContextProvider = ({children})=>{
    
    const[disabled, setDisabled] = useState(true);
 
    const[loggedIn,setLoggedIn] = useState(localStorage.getItem('token')? true:false)


    return (
        <GlobalContext.Provider value={{disabled,setDisabled,loggedIn,setLoggedIn}}>

            {children}
        </GlobalContext.Provider>
    )
}

export default ContextProvider