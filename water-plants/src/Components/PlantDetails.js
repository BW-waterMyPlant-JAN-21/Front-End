import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';


const PlantDetails = (props) => {
    const {plant} = useParams();
    const {push} = useHistory();
    const {plantData} = props;
    const [individualPlant, setIndividualPlant] = useState({});
    console.log(plant, typeof(plant));

    useEffect(() => {
        plantData.map((p) => {
            if(p.id === plant) {
                setIndividualPlant(p);
            }
            return p
        })

    }, [plantData, individualPlant, plant])

    const routeToDashboard = () => {
        push("/dashboard");
    }

    if(!individualPlant) {
        return <div>Plants Details are Loading.....</div>
    }

    return (
        <div className="plantContainer">
            <h1>Update / Change Plant Details</h1>
           <pre>{JSON.stringify(individualPlant, null, 2)}</pre>
           <form>
               <div>
                   <img src={individualPlant.plantImage} alt="default"/>
               </div>
               <h5>{`Species: ${individualPlant.species}`}</h5>
               <h6>{`NickName: ${individualPlant.nickname}`}</h6>
               <h6>{`Watering Schedule: ${individualPlant.days}`}</h6>
               <button onClick={routeToDashboard}>Cancel</button>
           </form>
        </div>
    )
}

export default PlantDetails;