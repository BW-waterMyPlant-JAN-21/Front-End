import React,{useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {GlobalContext} from '../context/globalContext'

const Navigation = () => {

    const {push} = useHistory()
const {loggedIn,setLoggedIn} = useContext(GlobalContext)

const logout = ()=>{
    localStorage.removeItem('token');
    setLoggedIn(false);
    push('/login')
}
  
    return (
        <div >
            { loggedIn 
             ?
            <div className="navigationItems">
                <li>
                     <Link to="/" className = "Home">Home</Link>
                </li>
                <li>
                     <Link to="/plantForm" className = "addPlant">Add Plant</Link>
                </li>

                <li>
                     <Link to="/dashboard" className = "Dashboard">Dashboard</Link>
                </li>
                <li>
                     <Link  className = "logout" onClick={()=>logout()}>Logout </Link>
                </li>


            </div>
            
               



                :
                <div className="navigationItems">
                     <li>
                     <Link to="/" className = "Home">Home</Link>
                </li>

                <li>
                     <Link to="/signup" className = "Signup">Sign Up
                </Link>
                </li>
                <li>
                    <Link  to="/login" className="Login">Login </Link>
                </li>
            </div>

            }
            
          
           
        </div>
    )
}

export default Navigation;