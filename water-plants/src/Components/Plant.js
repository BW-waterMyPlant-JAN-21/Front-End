import React from 'react';
import Timer from './Timer.js';

const Plant = (props) => {
    const {nickname, species, data, triggerDelete, image, days} = props;

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
            <Timer days={days}/>
            <button onClick= {deleteFunction}size="small" color="primary">
                Delete
            </button>
            <button href="#">More Info</button>
            </div>   
        </div>
    )
}

export default Plant;