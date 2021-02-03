import React, {useEffect} from 'react';
import {Link, useRouteMatch, useParams} from 'react-router-dom';


const Plant = (props) => {
    const {nickname, species, data, triggerDelete, image, days, today, num, addThirstyPlantFunction, listResetPlants, adjustResetListFunction, updatePlantsFunction} = props;

    let {url} = useRouteMatch();
    console.log(url);

    let {plant} = useParams();
    console.log(plant);

    const resetCurrentWateringDate = () => {
        let newDate = new Date();

        let dd = newDate.getDate();
        let mm = newDate.getMonth() + 1;
        let yy = newDate.getFullYear();

        if (mm < 10) {
            mm = "0" + mm;
        }

        if(dd < 10) {
            dd = "0" + dd;
        }

        let formattedDate = yy + "-" + mm + "-" + dd;
        return formattedDate;
    }

    const setNextDate = (dayAdded, wateringschedule) => {
        let newDate = new Date(dayAdded);
        newDate.setDate(newDate.getDate() + parseInt(wateringschedule) + 1);

        let dd = newDate.getDate();
        //One is added because it is a zero-based value
        let mm = newDate.getMonth() + 1;
        let yy = newDate.getFullYear();

        if (mm < 10) {
            mm = "0" + mm;
        }

        if(dd < 10) {
            dd = "0" + dd;
        }

        let formattedDate = yy + "-" + mm + "-" + dd;
        return formattedDate;
    }

    //This will delete the plant from the list of plants for user and also delete it from the list of plants due for watering if it is included there. 
    const deleteFunction = (evt) => {
    const nickNameText = evt.target.parentNode.parentNode.querySelector('h6').textContent;
        
        let datumIndex = 0;
        data.filter((datum) => {
            if(nickNameText.includes(datum.nickname)) {
                datumIndex = data.indexOf(datum);
                triggerDelete(datumIndex);
                adjustResetListFunction();
                console.log(listResetPlants);
            }
            return data;
        })
    }

    //This will create a list of all the plants which are due for watering today.
    useEffect(() => {
        let todaysDate = new Date();

        let dd = todaysDate.getDate();
        //One is added because it is a zero-based value
        let mm = todaysDate.getMonth() + 1;
        let yy = todaysDate.getFullYear();

        if (mm < 10) {
            mm = "0" + mm;
        }
        if(dd < 10) {
            dd = "0" + dd;
        }

        let formattedTodaysDate = yy + "-" + mm + "-" + dd;

        data.filter((datum) => {
            let checkDate = setNextDate(datum.today, datum.days);
            if(formattedTodaysDate === checkDate) {
                if(!listResetPlants.includes(datum)) {
                    addThirstyPlantFunction(datum);
                }
            }
            console.log(listResetPlants);
            return data;
        })
    }, [data, listResetPlants, addThirstyPlantFunction, adjustResetListFunction])

    const resetDateFunction = (evt) => {
        let copyPlantsData = [...data];
        let selectedPlantIndex = 0;
        let nickNameText = evt.target.parentNode.querySelector('h6').textContent;

        data.filter((datum) => {
            if(nickNameText.includes(datum.nickname)) {
                selectedPlantIndex = data.indexOf(datum);
                console.log(datum);
            }
            return data;
        })
        console.log(selectedPlantIndex);

        let originalWateringDate = setNextDate(copyPlantsData[selectedPlantIndex].today, copyPlantsData[selectedPlantIndex].days);
        let currentDate = resetCurrentWateringDate();

        //This will check if the plants are due for watering. Only then will the date be reset. Thus, the button will not work if the plants are not due for watering. 
        if(originalWateringDate === currentDate) {
            copyPlantsData[selectedPlantIndex] = ({...copyPlantsData[selectedPlantIndex], today: resetCurrentWateringDate()})
            updatePlantsFunction(copyPlantsData);
            adjustResetListFunction();
        }
    }

    return (
        <div className="plantContainer">
            <div className = "card">
            <h5>{`Species: ${species}`}</h5>
            <h6>{`Nickname: ${nickname}`}</h6>
            <div className="plantImage">
                <img width="100%" src={image} alt="nature" />
            </div>
            <h6>{`Date The Plant was Watered/Added: ${today}`} </h6>
            <h6>{`Watering Schedule: Every ${days} `}{parseInt(days) > 1  ? 'days' : 'day'}</h6>
            <h6>{`Next Date for Watering is ${setNextDate(today, days)}`}</h6>
            <button onClick= {deleteFunction}size="small" color="primary">
                Delete
            </button>
            
            <Link to = {`/plants/${num}`}>
                <button>More Info</button>
            </Link>
            <button onClick={resetDateFunction}>Reset Date</button>
            </div>   
        </div>
    )
}

export default Plant;