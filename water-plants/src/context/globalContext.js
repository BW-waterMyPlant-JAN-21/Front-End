import React, {createContext, useContext,useState} from 'react'

export const GlobalContext = createContext()
const ContextProvider = ({children})=>{
    
    const[disabled, setDisabled] = useState(true);
    const[activeUser,setActiveUser] = useState()
 
    const[loggedIn,setLoggedIn] = useState(localStorage.getItem('token')? true:false)
    const[plants,setPlants]=useState([])


    return (
        <GlobalContext.Provider value={{disabled,setDisabled,loggedIn,setLoggedIn,plants,setPlants,activeUser,setActiveUser}}>

            {children}
        </GlobalContext.Provider>
    )
}

export default ContextProvider