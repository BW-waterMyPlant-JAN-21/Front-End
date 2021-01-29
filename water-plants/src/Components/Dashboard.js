import React, {useState} from 'react';
import axios from 'axios';
import Plant from './Plant.js';

const Dashboard = (props) => {
    const initialPlantDetails = {
        id: " ",
        nickname: " ",
        species: " "
    }

    const [plantDetails, setPlantDetails] = useState(initialPlantDetails);
    const [userPlants, setUserPlants] = useState([]);

    const enterPlantDetails = (evt) => {
        const{name, value} = evt.target;
        console.log(name, value);
        setPlantDetails({...plantDetails, [name]: value});
    }

    const createPlantCards = (evt) => {
        evt.preventDefault();

        axios.post("https://reqres.in/api/users", plantDetails)
        .then((res) => setUserPlants([...userPlants, plantDetails]))
        .catch((err) => console.log(err))

        setPlantDetails(initialPlantDetails);
    }

    return (
        <div>
            <h2>Add Your Plants!</h2>
            <form onSubmit = {createPlantCards} className="plantForm">
                <label>id:
                    <input onChange = {enterPlantDetails} type="text" value={plantDetails.id} name="id" placeholder="Enter ID"/>
                </label>
                <label>nickname:
                    <input onChange = {enterPlantDetails} type="text" value={plantDetails.nickname} name="nickname" placeholder="Enter nickname"/>
                </label>
                <label>species:
                    <input onChange = {enterPlantDetails} type="text" value= {plantDetails.species} name="species" placeholder="Enter species"/>
                </label>
                <button>Add The Plant</button>
            </form>
            <div className="plantContainer">
                {userPlants.map((plant) => {
                    return <Plant nickname={plant.nickname} species={plant.species}/>
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard;