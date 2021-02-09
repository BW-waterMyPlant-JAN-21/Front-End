import React, {useState,useContext ,useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import nature from "../Assets/nature.jpg";
import {GlobalContext} from '../context/globalContext'
import {Link} from 'react-router-dom'
import axios from 'axios'


const PlantDetails = () => {

    let {plants} = useContext(GlobalContext)
    const {id} = useParams();

    let plant = plants.find(plant=>plant.id===Number(id))
    const {push} = useHistory();

    if(!plant) {
        return <div>Plants Details are Loading.....</div>
    }



    const deleteCard = ()=>{ 
    axios
    .delete(`https://cors-anywhere.herokuapp.com/https://waterplant-101.herokuapp.com/plants/${id}`,{headers:{authorization:localStorage.getItem('token')}})
    .then(res=>{console.log(`plant with id ${id} is deleted successfully`);push('/dashboard')})
    .catch(err=>console.log(err))
}

    return (

        <div className='plantContainer'>
        {
         
            <div className='card'>
              <h2>{plant.nickname}</h2>
              <p>Species: {plant.species}</p>
              <p>Watering Frequency: {plant.frequency_d}</p>
              <Link to={`/plants/${plant.id}/editing`} > Edit </Link>
              {/* <button onClick={()=>push(`plants/${plant.id}/editing`)}>Edit</button> */}
              <button onClick={deleteCard}>Delete</button>
              <button onClick={()=>push('/dashboard')}> Cancel </button>
             
              </div>

         
        }
      </div>
       
    )
}

export default PlantDetails;