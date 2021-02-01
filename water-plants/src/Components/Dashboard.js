import React, {useState} from "react";
import axios from "axios";
import Plant from "./Plant.js";
import nature from "../Assets/nature.jpg";


const Dashboard = (props) => {
  const initialPlantDetails = {
    nickname: " ",
    species: " ",
    plantImage: nature,
    days: "00",
    today: "",
  };

  const [plantDetails, setPlantDetails] = useState(initialPlantDetails);
  const [userPlants, setUserPlants] = useState([]);

  const enterPlantDetails = (evt) => {
    const { name, value, type} = evt.target;
    console.log(name, type, value);
    const updatedValue = (type === 'file' ? evt.target.files[0] : value);
    setPlantDetails({...plantDetails, [name]: updatedValue});

  };

  const createPlantCards = (evt) => {
    evt.preventDefault();

    axios
      .post("/users", plantDetails)
      .then((res) => {
        console.log(res.data)
        setUserPlants([...userPlants, res.data])
      })
      .catch((err) => console.log(err));

    setPlantDetails(initialPlantDetails);
  };

  const triggerDelete = ((index) => {
      let copyUserPlants = [...userPlants];
      copyUserPlants.splice(index, 1);
      setUserPlants(copyUserPlants)
  })

  return (
    <div>
      <h2>Add Your Plants!</h2>
      <form onSubmit={createPlantCards} className='plantForm'>
        <label>
          nickname:
          <input
            onChange={enterPlantDetails}
            type='text'
            value={plantDetails.nickname}
            name='nickname'
            placeholder='Enter nickname'
          />
        </label>
        <label>
          species:
          <input
            onChange={enterPlantDetails}
            type='text'
            value={plantDetails.species}
            name='species'
            placeholder='Enter species'
          />
        </label>
        <div>
            <p>H2O Frequency Timer:</p>
          <label>
            Set the Schedule
            <select onChange = {enterPlantDetails} value = {plantDetails.days} name="days">
              <option>--Select Days--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>Date when the plant was added:
            <input value = {plantDetails.today} onChange={enterPlantDetails} name="today" type="date"/>
          </label>
        </div>
        <label>Select an Image
          <div>
            <input type="file" onChange ={enterPlantDetails} name="plantImage"/>
          </div>
        </label>
        <button>Add The Plant</button>
      </form>
      <div className='plantContainer'>
        {userPlants.map((plant,index) => {
          return (
            <Plant
              key = {index}
              nickname={plant.nickname}
              species={plant.species}
              data={userPlants}
              days = {plant.days}
              image = {plant.plantImage}
              today = {plant.today}
              triggerDelete = {triggerDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
