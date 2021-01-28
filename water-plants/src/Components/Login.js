import React from 'react';
import {useHistory} from 'react-router-dom';

const Login = (props) => {
    const history = useHistory();
    const clickFunction = () => {
        history.goBack();
    }
    return (
        <div className="form-login">
            <form>
                <label>User Name: 
                    <input/>
                </label>
                <label> Password:
                    <input/>
                </label>
                <button>Login</button>
            </form>
            <button onClick={clickFunction}>Return Home</button>
        </div>
    )
}

export default Login;