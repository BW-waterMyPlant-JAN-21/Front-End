import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './Components/Home.js';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import Navigation from './Components/Navigation.js';
import Dashboard from './Components/Dashboard.js';

function App() {
  const initialFormValues = {
    username : ' ',
    phoneNumber: ' ',
    password: ' ',
    confirmPassword: ' ',
  }

  const [form, setForm] = useState(initialFormValues);

  const updateValue = (inputName, inputValue) => {
    setForm({...form, [inputName] : inputValue}) //Updates form values
  }

  const submitFunction = () => {
    setForm(initialFormValues); //Reset the form values
  }

  return (
    <div className="App">
      <h1>Water-My-Plants</h1>
      <Navigation/>
      <Switch>
        <Route path="/signup">
            <Signup
              form = {form}
              updateValue = {updateValue}
              submitFunction = {submitFunction}
            />
        </Route>
        <Route path="/login">
            <Login/>
        </Route>
        <Route path="/dashboard">
            <Dashboard/>
        </Route>
        <Route exact path="/">
            <Home></Home>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
