import React from 'react';
import {useHistory} from 'react-router-dom';

const Signup = (props) => {
    const history = useHistory();

    const clickFunction = () => {
        history.goBack();
    }
    return (
        <div className="form-signup">
            <form>
                <label> User Name:
                    <input/>
                </label>
                <label> Cell Number:
                    <input/>
                </label>
                <label> Password:
                    <input/>
                </label>
                <label> Confirm Password:
                    <input/>
                </label>
                <button>Create Account</button>
            </form>
            <button onClick = {clickFunction}>Return Home</button>
        </div>
    )
}

export default Signup;