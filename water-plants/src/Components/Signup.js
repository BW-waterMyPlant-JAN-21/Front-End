import React, {useState, useEffect} from 'react';
import * as yup from 'yup';

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/
const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
    username: yup.string().required('User Name is Required!').min(2, "Names must be atleast 2 Characters Long"),
    password: yup.string().required('Password is Required!')
    .matches(lowercaseRegex, 'one lowercase character required')
    .matches(uppercaseRegex, 'one uppercase character required')
    .matches(numericRegex, 'one number required')
    .min(8, 'Minimum 8 characters required!'),
    phoneNumber: yup.string()
    .required('required')
    .matches(phoneRegex, 'Phone Number is not valid'),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Password must be the same!')
})

const Signup = (props) => {
    const {form, updateValue, submitFunction} = props;

    const [errors, setErrors] = useState({
        username: ' ',
        phoneNumber: ' ',
        password: ' ',
        confirmPassword: ' '
    })

    const[disabled, setDisabled] = useState(true);

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setErrors({...errors, [name]: ''}))
        .catch((err) => {
            setErrors({...errors, [name]: err.errors[0]})
        })
    }

    const changeFunction = (evt) => {
        const{name, value} = evt.target;
        console.log(name, value);
        updateValue(name, value);
        setFormErrors(name, value);
    }

    useEffect(() => {
        schema.isValid(form).then(valid =>setDisabled(!valid))
    }, [form])

    return (
        <div className="form-signup">
            <form onSubmit={submitFunction}>
                <label> User Name:
                    <input onChange={changeFunction} value={form.username} name="username" type="text" placeholder="Enter User Name"/>
                </label>
                <label> Cell Number:
                    <input onChange={changeFunction} value={form.phoneNumber} name="phoneNumber" type="text" placeholder="Enter Phone Number"/>
                </label>
                <label> Password:
                    <input onChange={changeFunction} value={form.password} name="password" type="text" placeholder="Enter Password"/>
                </label>
                <label> Confirm Password:
                    <input onChange={changeFunction} value={form.confirmPassword} name="confirmPassword" type="text" placeholder="Enter Pasword Again to Confirm"/>
                </label>
                <div style={{color: 'purple'}}>
                    <p>{errors.username}</p>
                    <p>{errors.password}</p>
                    <p>{errors.confirmPassword}</p>
                </div>
                <button disabled = {disabled}>{disabled ? 'Fill The Form' : 'Submit Form'}</button>
            </form>
        </div>
    )
}

export default Signup;