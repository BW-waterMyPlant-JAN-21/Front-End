import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
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
                <Link to="/login" className="Login">Log In
                </Link>
            </li>
        </div>
    )
}

export default Navigation;