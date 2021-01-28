import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './Components/Home.js';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';

function App() {
  const initialFormValues = {
    user : ' ',
    phoneNumber: ' ',
    password: ' ',
    confirmPassword: ' ',
}

  const [form, setForm] = useState(initialFormValues);

  return (
    <div className="App">
      <h1>Water-My-Plants</h1>
      <Switch>
        <Route path="/signup">
            <Signup />
        </Route>
        <Route path="/login">
            <Login/>
        </Route>
        <Route exact path="/">
            <Home></Home>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
