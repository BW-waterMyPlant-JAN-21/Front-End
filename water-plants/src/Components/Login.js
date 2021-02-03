import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Login = ({admin, authenticateUserFunction, authenticatedUser}) => {

    const [user, setUser] = useState({
        userName: " ",
        password: " ",
    })

    const history = useHistory();

    const formChangeFunction = (evt) => {
        const {name, value} = evt.target;
        console.log(name, value);
        setUser({...user, [name] : value});
    }

    const loginAttempt = (evt) => {
        evt.preventDefault();
        authenticateUserFunction(true);
        setUser({...user, userName : " ", password : " "});
        history.push('/dashboard');
    }

    return (
        <div className="form-login">
            <form onSubmit = {loginAttempt}>
                <label>User Name: 
                    <input onChange = {formChangeFunction} name ="userName" value={user.userName}/>
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