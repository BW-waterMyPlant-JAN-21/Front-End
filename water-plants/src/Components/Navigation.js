import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navigation = (props) => {
    const {authenticatedUser, authenticateUserFunction} = props;

    const history = useHistory();

    const loginInOutFunction = (evt) => {
        if(authenticatedUser) {
            authenticateUserFunction(false);
        } else {
            history.push('/login');
        }

    }
    return (
        <div className="navigationItems">
            <li>
                <Link to="/" className = "Home">Home
                </Link>
            </li>
            <li>
                <Link to="/dashboard" className = "Dashboard">Dashboard
                </Link>
            </li>
            <li>
                <Link to="/signup" className = "Signup">Sign Up
                </Link>
            </li>
            <li>
                <Link onClick = {loginInOutFunction} to="/login" className="Login">
                    {authenticatedUser === true ? "Log Out" : "Log In"}
                </Link>
            </li>
        </div>
    )
}

export default Navigation;