import React from 'react';
import {Link, useRouteMatch, useParams} from 'react-router-dom';


const Plant = (props) => {
    const {nickname, species, data, triggerDelete, image, days, today, num} = props;

    let {url} = useRouteMatch();
    console.log(url);

    let {plant} = useParams();
    console.log(plant);

    let toDay = new Date(today);
    let newDate = new Date(toDay);
    newDate.setDate(newDate.getDate() + parseInt(days) + 1);

    const setNextDate = () => {
        let toDay = new Date(today);
        let newDate = new Date(toDay);
        newDate.setDate(newDate.getDate() + parseInt(days) + 1);

        let dd = newDate.getDate();
        let mm = newDate.getMonth();
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
            <h6>{`Next Date for Watering is ${setNextDate()}`}</h6>
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