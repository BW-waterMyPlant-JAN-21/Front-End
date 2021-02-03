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
  const [listResetPlants, setListResetPlants] = useState([]);

  const [authenticatedUser, setAuthentication] = useState(false);

  const addThirstyPlants = (thirstyPlant) => {
    setListResetPlants([...listResetPlants, thirstyPlant]);
  }

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

  const adjustResetList = (() => {
    let copyResetArray = [...listResetPlants];
    let deletedPlantIndex = 0;
    copyResetArray.map((plant) => {
      if(!userPlants.includes(plant)) {
        deletedPlantIndex = copyResetArray.indexOf(plant);
        copyResetArray.splice(deletedPlantIndex, 1);
      }
      setListResetPlants(copyResetArray);
      return listResetPlants;
    })
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

  //This will help pass down the set plants data function to the child components
  const updatePlantsData = (updatedArray) => {
    setUserPlants(updatedArray);
  }

  /*Fake User Authentication Data*/
  const admin = {
    userName : 'jayaram',
    password: 'jayaram123',
  }

  const authenticateUserFunction = (status) => {
    setAuthentication(status);
  }

  /*Fake User Authentication Data*/

  return (
    <div className="App">
      <h1>Water-My-Plants</h1>
      <Navigation authenticatedUser = {authenticatedUser} authenticateUserFunction = {authenticateUserFunction}/>
      <Switch>
        <Route exact path="/">
            <Home></Home>
        </Route>
        <Route path="/signup">
            <Signup
              form = {form}
              updateValue = {updateValue}
              submitFunction = {submitFunction}
            />
        </Route>
        <Route path="/login">
            <Login admin = {admin} authenticateUserFunction = {authenticateUserFunction} authenticatedUser = {authenticatedUser}/>
        </Route>
        <Route path="/dashboard">
            <Dashboard 
            createPlantFunction = {createPlantCards} 
            deleteFunction = {triggerDelete}
            plantData = {userPlants}
            addThirstyPlantFunction = {addThirstyPlants}
            listResetPlants = {listResetPlants}
            adjustResetListFunction = {adjustResetList}
            updatePlantsFunction = {updatePlantsData}
            />
        </Route>
        <Route path="/plants/:plant">
            <PlantDetails plantData = {userPlants} updatePlantsFunction = {updatePlantsData}/>
          </Route>
      </Switch>
    </div>
  );
}

export default App;
