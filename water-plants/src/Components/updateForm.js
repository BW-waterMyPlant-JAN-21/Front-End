
import axios from "axios";
import React, {useState,useContext,useEffect} from "react";
import {useHistory,useParams} from 'react-router-dom'



const UpdateForm = ()=>{
    let {push} = useHistory()
    let {id}=useParams()

    const startPlantDetails = {
        nickname: "",
        species: "",
        // plantImage: nature,
        frequency_d: 1,
      
      };
  const [plantDetails, setPlantDetails] = useState(startPlantDetails);

    useEffect(() => {
      axios
      .get(`https://cors-anywhere.herokuapp.com/https://waterplant-101.herokuapp.com/plants/${(id)}`,{headers:{authorization:localStorage.getItem('token')}})

      .then(res=>{
        setPlantDetails(res.data[0]);
        console.log('editing form ',res.data)
      })
      .catch(err=>console.log(err))
    }, [])
    
    
    
      const enterPlantDetails = (evt) => {
        const {name, value} = evt.target;
        console.log(name, value);
        setPlantDetails({...plantDetails, [name] : value});
      }

      const saveChanges = (e)=>{
          e.preventDefault();
          axios
          .put(`https://cors-anywhere.herokuapp.com/https://waterplant-101.herokuapp.com/plants/${id}`,plantDetails,{headers:{authorization:localStorage.getItem('token')}})
          .then(res=>{console.log('saved changes Plant',res.data);push('/dashboard')})
          .catch(err=>console.log(err))
      }



    return(


        <div className="dashboardForm">
        <h2>Add Your Plants!</h2>
        <form onSubmit={saveChanges} className='plantForm'>
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
        <button>Save Plant</button>
      </form>

      </div>
    )

}

export default UpdateForm