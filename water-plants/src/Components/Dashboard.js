import React, {useState} from "react";
import Plant from "./Plant.js";
import nature from "../Assets/nature.jpg";

const Dashboard = (props) => {

  const {createPlantFunction, deleteFunction, plantData, addThirstyPlantFunction, listResetPlants, adjustResetListFunction, updatePlantsFunction} = props;

  const startPlantDetails = {
    nickname: " ",
    species: " ",
    plantImage: nature,
    days: "00",
    today: "",
  };

  const [plantDetails, setPlantDetails] = useState(startPlantDetails);

  const enterPlantDetails = (evt) => {
    const {name, value} = evt.target;
    console.log(name, value);
    setPlantDetails({...plantDetails, [name] : value});
  }

  const createPlantCards = (evt) => {
    evt.preventDefault();
    createPlantFunction(plantDetails);
    setPlantDetails(startPlantDetails);
    adjustResetListFunction();
  }

  return (
    <div className="dashboardForm">
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
        <div className="wateringSchedule">
          <p>H2O Frequency Timer:</p>
          <label>
            Watering Frequency (Days)
            <select onChange = {enterPlantDetails} value = {plantDetails.days} name="days">
              <option>--Select Days--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>Date when the plant was last watered:
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
        {plantData.map((plant) => {
          return (
            <Plant
              key = {plant.id}
              num = {plant.id}
              nickname={plant.nickname}
              species={plant.species}
              data={plantData}
              days = {plant.days}
              image = {plant.plantImage}
              today = {plant.today}
              triggerDelete = {deleteFunction}
              addThirstyPlantFunction = {addThirstyPlantFunction}
              listResetPlants = {listResetPlants}
              updatePlantsFunction = {updatePlantsFunction}
              adjustResetListFunction = {adjustResetListFunction}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
