import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import nature from "../Assets/nature.jpg";


const PlantDetails = (props) => {
    const {plant} = useParams();
    const {push} = useHistory();
    const {plantData, updatePlantsFunction} = props;
    const [individualPlant, setIndividualPlant] = useState({
        nickname: " ",
        species: " ",
        plantImage: nature,
        days: "00",
        today: "",
    });
    console.log(plant, typeof(plant));

    useEffect(() => {
        plantData.map((p) => {
            if(p.id === plant) {
                setIndividualPlant(p);
            }
            return p
        })
    }, [plant, plantData])

   
    

    const routeToDashboard = () => {
        push("/dashboard");
    }

    if(!individualPlant) {
        return <div>Plants Details are Loading.....</div>
    }

    const updatePlantValues = (evt) => {
        const {name, value} = evt.target;
        console.log(name, value);
        setIndividualPlant({...individualPlant, [name] : value});
    }

    const saveChangeFunction = (evt) => {
        evt.preventDefault();
        let plantIndex = 0;
        plantData.map((p) => {
            if(p.id === plant) {
                plantIndex = plantData.indexOf(p);
            }
            console.log(plantIndex);
        })
        let copyArray = [...plantData];
        copyArray[plantIndex] = (individualPlant);
        console.log(copyArray);
        updatePlantsFunction(copyArray);
        push('/dashboard');
    }

    return (
        <div className="plantDetailsContainer">
           <h1>Update / Change Plant Details</h1>
           <form onSubmit={saveChangeFunction}>
               <div> 
                   <img src={individualPlant.plantImage} alt="default"/>
               </div>
               <label> Species :
                    <input onChange = {updatePlantValues} type="text" value = {individualPlant.species} name = "species"/>
                </label> 
                <label> Nick Name :
                    <input onChange = {updatePlantValues} type="text" value = {individualPlant.nickname} name = "nickname"/>
                </label>
                <label>
                Watering Schedule : 
                    <select onChange = {updatePlantValues} value = {individualPlant.days} name="days">
                        <option>--Select Days--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="7">7</option>
                        <option value="14">14</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <button>Save Changes</button>
           </form>
           <button onClick={routeToDashboard}>Cancel</button>
        </div>
    )
}

export default PlantDetails;