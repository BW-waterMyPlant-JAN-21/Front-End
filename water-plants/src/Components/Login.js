import React, {useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../context/globalContext'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const Login = () => {
    let {push} = useHistory()

    const [user, setUser] = useState({
        username: "",
        password: "",
    })
    const {setLoggedIn,setActiveUser,activeUser} = useContext(GlobalContext)
  

    const history = useHistory();

    const formChangeFunction = (evt) => {
        const {name, value} = evt.target;
        console.log(name, value);
        setUser({...user, [evt.target.name] : evt.target.value});
    }
   

    const loginAttempt = (e) => {
        e.preventDefault();
        
     axios
     .post('https://waterplant-101.herokuapp.com/auth/login',user)
     .then(res=>{localStorage.setItem('token',res.data.token);
    //  let decoded = jwt_decode(res.data.token);
     setActiveUser(jwt_decode(res.data.token).userId)
     console.log('acive user in login ',activeUser)
     push('/dashboard')
     console.log('token',res.data.token)
     setLoggedIn(true)
     })
     .catch(err=>console.log(err))
    }

    return (
        <div className="form-login">
            <form onSubmit = {loginAttempt}>
                <label>User Name: 
                    <input onChange = {formChangeFunction} name ="username" value={user.username}/>
                </label>
                <label> Password:
                    <input onChange = {formChangeFunction} name = "password" value={user.password}/>
                </label>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;