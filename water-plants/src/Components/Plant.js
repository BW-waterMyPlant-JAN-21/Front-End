import React from 'react';

const Plant = (props) => {
    const {nickname, species} = props;
    return (
        <div className="Card">
            <h3>{species}</h3>
            <h5>{nickname}</h5>
        </div>
    )
}

export default Plant;