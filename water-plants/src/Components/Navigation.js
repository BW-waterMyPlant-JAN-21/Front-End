import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
    return (
        <div className="navigationItems">
            <Link to="/signup" className = "Signup">
                <li>Sign Up</li>
            </Link>
            <Link to="/login" className="Login">
                <li>Log In</li>
            </Link>
        </div>
    )
}

export default Navigation;