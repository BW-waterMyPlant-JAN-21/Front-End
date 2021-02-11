import React, {useEffect,useContext} from "react";
// import nature from "../Assets/nature.jpg";
import {GlobalContext} from '../context/globalContext'
import axios from "axios";
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const Dashboard = () => {


  let {plants,setPlants,activeUser,setActiveUser} = useContext(GlobalContext)

  //get the active user
  useEffect(() => {
    
  }, [])

  // get all plants
  useEffect(() => {

    let token = localStorage.getItem('token');
    setActiveUser(jwt_decode(token).userId);
    console.log('acive user in dashboard ',activeUser)
    
  axios
  .get(`https://waterplant-101.herokuapp.com/plants/users/${activeUser}`,{headers:{authorization:token}})
  .then(res=>{setPlants(res.data);console.log('plants in dashboard',plants)})
  .catch(err=>console.log(err))
  }, [])


  return (
    <div className="dashboard">
 
   
      {<div className="wateringNotification">
          <h5>Important Notifications!</h5>
          {/* {listResetPlants.map((eachPlant) => {
            return <p>{`${eachPlant.nickname} plant needs water`}</p>
          })} */}
        </div>
      }
     {/* <PlantForm/> */}


     
      <div className='plantContainer'>
        {
          plants.map(plant=>{
           return  <div className='card' key={plant.id}>
              <h2>{plant.nickname}</h2>
              <p>Species: {plant.species}</p>
              <p>Watering Frequency: {plant.frequency_d}</p>
              <Link to = {`/plants/${plant.id}`}>More</Link>
              </div>

          })
        }
      </div>
    </div>
  );
};

export default Dashboard;
