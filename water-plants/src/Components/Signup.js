import axios from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import * as yup from 'yup';
import {GlobalContext} from '../context/globalContext'

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

const schema = yup.object().shape({
    username: yup.string().required('User Name is Required!').min(2, "Names must be atleast 2 Characters Long"),
    password: yup.string().required('Password is Required!')
    .matches(lowercaseRegex, 'one lowercase character required')
    .matches(uppercaseRegex, 'one uppercase character required')
    .matches(numericRegex, 'one number required')
    .min(8, 'Minimum 8 characters required!'),
    phoneNumber: yup.number()
    .required('Phone Number is Required'),
    // confirmPassword: yup.string()
    // .required('Please Confirm Password before submitting the form')
})

const Signup = (props) => {

    let {disabled, setDisabled} = useContext(GlobalContext)

    const[form,updateValue] = useState({
        username: '',
        phoneNumber: '',
        password: '',
        
    })
   

    const [errors, setErrors] = useState({
        username: ' ',
        phoneNumber: ' ',
        password: ' ',
        // confirmPassword: ' '
    })


    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setErrors({...errors, [name]: ''}))
        .catch((err) => {
            setErrors({...errors, [name]: err.errors[0]})
        })
    }

    const changeFunction = (e) => {
        // const{name, value} = evt.target;
        // console.log(name, value);
        // updateValue(name, value);
        // setFormErrors(name, value);
        updateValue({...form,[e.target.name]:e.target.value})
        console.log('form data in change',form)
    }

    useEffect(() => {
        schema.isValid(form).then(valid =>setDisabled(!valid))
    }, [form])

    const submitFunction =(e)=>{
        e.preventDefault();

        console.log('form',form)
        axios
        .post('https://waterplant-test.herokuapp.com/register',{username:form.username,password: form.password,phoneNumber: form.phoneNumber})
        .then((res)=>{
        console.log(res.data)})
        .catch(err=>console.log(err))
    }

    return (
        <div className="form-signup">
            <form onSubmit={submitFunction}>
                <label> User Name:
                    <input onChange={changeFunction} value={form.username} name="username" type="text" placeholder="Enter User Name"/>
                </label>
                <p style={{color: 'red'}}>{errors.username}</p>
                <label> Cell Number:
                    <input onChange={changeFunction} value={form.phoneNumber} name="phoneNumber" type="string" placeholder="Enter Phone Number"/>
                </label>
                <p style={{color: 'red'}}>{errors.phoneNumber}</p>
                <label> Password:
                    <input onChange={changeFunction} value={form.password} name="password" type="text" placeholder="Enter Password"/>
                </label>
                <p style={{color: 'red'}}>{errors.password}</p>
                {/* <label> Confirm Password:
                    <input onChange={changeFunction} value={form.confirmPassword} name="confirmPassword" type="text" placeholder="Enter Pasword Again to Confirm"/>
                </label> */}
                {/* <p style={{color: 'red'}}>{errors.confirmPassword}</p> */}
                <button>sign up </button>
                {/* disabled = {disabled}>{disabled ? 'Fill The Form' : 'Submit Form'} */}
            </form>
        </div>
    )
}

export default Signup;