import React, {useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../context/globalContext'
import axios from 'axios'

const Login = () => {
    let {push} = useHistory()

    const [user, setUser] = useState({
        username: "",
        password: "",
    })
    // const {user,setUser} = useContext(GlobalContext)
  

    const history = useHistory();

    const formChangeFunction = (evt) => {
        const {name, value} = evt.target;
        console.log(name, value);
        setUser({...user, [evt.target.name] : evt.target.value});
    }
    console.log('user in login ',user)

    const loginAttempt = (e) => {
        e.preventDefault();
        
     axios
     .post('https://waterplant-test.herokuapp.com/login',user)
     .then(res=>{localStorage.setItem('token',res.data.token);
     push('/dashboard')
     console.log('token',res.data.token)
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