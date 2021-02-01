import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './Components/Home.js';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import Navigation from './Components/Navigation.js';
import Dashboard from './Components/Dashboard.js';
import PlantDetails from './Components/PlantDetails.js';
import axios from 'axios';

function App() {
  const initialFormValues = {
    username : ' ',
    phoneNumber: ' ',
    password: ' ',
    confirmPassword: ' ',
  }

  const [userPlants, setUserPlants] = useState([]); //Includes all of User's Plants
  const [form, setForm] = useState(initialFormValues);

  const submitFunction = () => {
    setForm(initialFormValues); //Reset the form values
  }

  const createPlantCards = (plantDetails) => {
    axios
      .post("/users", plantDetails)
      .then((res) => {
        console.log(res.data)
        setUserPlants([...userPlants, res.data])
      })
      .catch((err) => console.log(err));
  };

  const triggerDelete = ((index) => {
    let copyUserPlants = [...userPlants];
    copyUserPlants.splice(index, 1);
    setUserPlants(copyUserPlants)
  })

  const updateValue = (inputName, inputValue) => {
    setForm({...form, [inputName] : inputValue});
  }

  useEffect(() => {
    const data = localStorage.getItem('user-plant-list');

    if(data) {
      setUserPlants(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user-plant-list', JSON.stringify(userPlants));
  });

  const updatePlantsData = (updatedArray) => {
    setUserPlants(updatedArray);
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
            <Dashboard 
            createPlantFunction = {createPlantCards} 
            deleteFunction = {triggerDelete}
            plantData = {userPlants}
            />
        </Route>
        <Route path="/plants/:plant">
            <PlantDetails plantData = {userPlants} updatePlantsFunction = {updatePlantsData}/>
          </Route>
        <Route exact path="/">
            <Home></Home>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
