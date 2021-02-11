
import axios from "axios";
import React, {useState,useContext} from "react";
import {useHistory} from 'react-router-dom'

import {GlobalContext} from '../context/globalContext'




const PlantForm = ()=>{

    let {push} = useHistory()
    let {activeUser} = useContext(GlobalContext)
  

    const startPlantDetails = {
        nickname: "",
        species: "",
        // plantImage: nature,
        frequency_d: 1,
      
      };
    
      const [plantDetails, setPlantDetails] = useState(startPlantDetails);
    
      const enterPlantDetails = (evt) => {
        const {name, value} = evt.target;
        console.log(name, value);
        setPlantDetails({...plantDetails, [name] : value});
        console.log('plant changes',plantDetails)
      }

 



console.log('user id from token by decoder in plant form',activeUser)
     

      const createPlantCards = (e)=>{
          e.preventDefault();
          console.log('plant data in form',plantDetails)
          axios
          .create({headers:{authorization:localStorage.getItem('token')}})
          .post(`https://waterplant-101.herokuapp.com/plants/users/${activeUser}`,plantDetails)
          .then(res=>{console.log('added newPlant',res.data);push('/dashboard')}) //push(`/plants/${res.data[0].id}`)
          .catch(err=>console.log(err))
      }



    return(


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
            <select onChange = {enterPlantDetails} value = {plantDetails.frequency_d} name="frequency_d">
              <option>--Select Days--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
        {/* <label>Select an Image
          <div>
            <input type="file" onChange ={enterPlantDetails} name="plantImage"/>
          </div>
        </label> */}
        <button>Add The Plant</button>
      </form>

      </div>
    )

}

export default PlantForm