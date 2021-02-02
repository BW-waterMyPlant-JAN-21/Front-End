import React, {useEffect} from 'react';
import {Link, useRouteMatch, useParams} from 'react-router-dom';


const Plant = (props) => {
    const {nickname, species, data, triggerDelete, image, days, today, num, addThirstyPlantFunction, listResetPlants} = props;

    let {url} = useRouteMatch();
    console.log(url);

    let {plant} = useParams();
    console.log(plant);

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

    const deleteFunction = (evt) => {
    const nickNameText = evt.target.parentNode.parentNode.querySelector('h6').textContent;
        
        let datumIndex = 0;
        data.filter((datum) => {
            if(nickNameText.includes(datum.nickname)) {
                datumIndex = data.indexOf(datum);
                triggerDelete(datumIndex);
            }
            return data;
        })
    }

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
        })
    }, [data, listResetPlants, addThirstyPlantFunction])

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
            </div>   
        </div>
    )
}

export default Plant;