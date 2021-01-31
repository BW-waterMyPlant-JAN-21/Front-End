import React, {useState, useEffect, useRef} from 'react';
import {Card, CardBody, CardLink, CardTitle, CardSubtitle} from 'reactstrap';

const Plant = (props) => {
    const {nickname, species, data, triggerDelete, image, countDownDate} = props;

    const [timer, setTimer] = useState({
        daysLeft: "00",
        hoursLeft: "00", 
        minutesLeft: "00", 
        secondsLeft: "00",
    })

    let interval = useRef();

    const startTimer = () => {
        const now = new Date().getTime()

        interval = setInterval(() => {
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(distance < 0) {
                clearInterval(interval);
            } else {
                setTimer({...timer, daysLeft: days, hoursLeft: hours, minutesLeft: minutes, secondsLeft: seconds});
            }

        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval);
        };
    });

    const deleteFunction = (evt) => {
    const nickNameText = evt.target.parentNode.parentNode.querySelector('h6').textContent;
        
        let datumIndex = 0;
        data.filter((datum) => {
            if(nickNameText.includes(datum.nickname)) {
                datumIndex = data.indexOf(datum);
                triggerDelete(datumIndex, 1);
            }
            return data;
        })
    }

    return (
        <div className="plantContainer">
            <Card className="card">
                <CardBody>
                    <CardTitle tag="h5">{`Species: ${species}`}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{`Nickname: ${nickname}`}</CardSubtitle>
                    </CardBody>
                        <img width="100%" src={image} alt="nature" />
                    <CardBody>
                    <h3>Time Left to Water: </h3>
                    <div className = 'timer'>
                    <p>{timer.daysLeft}</p>
                    <p>{` : `}</p>
                    <p>{timer.hoursLeft}</p>
                    <p>{` : `}</p>
                    <p>{timer.minutesLeft}</p>
                    <p>{` : `}</p>
                    <p>{timer.secondsLeft}</p>
                    </div>
                    <button>Reset Timer</button>
                    <button onClick={deleteFunction}size="small" color="primary">
                        Delete
                    </button>
                    <CardLink href="#">More Info</CardLink>
                </CardBody>
            </Card>      
        </div>
    )
}

export default Plant;