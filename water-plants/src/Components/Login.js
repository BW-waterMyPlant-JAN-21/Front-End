import React from 'react';

const Login = (props) => {

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
        </div>
    )
}

export default Login;