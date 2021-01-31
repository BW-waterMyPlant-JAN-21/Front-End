import React, {useState} from "react";
import axios from "axios";
import Plant from "./Plant.js";
import nature from "../Assets/nature.jpg";


const Dashboard = (props) => {
  const initialPlantDetails = {
    nickname: " ",
    species: " ",
    schedule: " ",
    plantImage: nature,
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
            <select onChange = {enterPlantDetails} value = {plantDetails.schedule} name="schedule">
              <option value="Every Minute">Every Minute</option>
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi Weekly">Bi-Weekly</option>
              <option value="Every 10 Days">Every 10 Days</option>
            </select>
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
              countDownDate = {
                (() => {
                  switch(plant.schedule) {
                    case 'Daily': return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).getTime() ;
                    case 'Weekly': return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).getTime();
                    case 'Bi Weekly': return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 14).getTime();
                    case 'Every 10 Days': return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10).getTime();
                    case 'Hourly': return new Date().getTime() + (60 * 60 * 1000);
                    default: return new Date().getTime() + (60 * 1000);
                  }
                })()
              }
              image = {plant.plantImage}
              triggerDelete = {triggerDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
