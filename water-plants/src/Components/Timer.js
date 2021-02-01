import React, {useState, useEffect, useRef} from 'react';

const Timer = (props) => {
    const [timer, setTimer] = useState({
        daysLeft: "00",
        hoursLeft: "00", 
        minutesLeft: "00", 
        secondsLeft: "00",
    })

    let interval = useRef();

    const startTimer = () => {
        let countDownDate = ""
        interval = setInterval(() => {
            const now = new Date().getTime();
            const daysNumber = parseInt(props.days);
            console.log(daysNumber);
            countDownDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + daysNumber).getTime();
           
            const distance = (countDownDate - now);

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(distance < 0) {
                clearInterval(interval.current);
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

    return (
        <div className="timer">
            <h3>Time Left to Water: </h3>
            <div className = "ticktock">
                <p>{timer.daysLeft} Days</p>
                <p>{` : `}</p>
                <p>{timer.hoursLeft} Hrs</p>
                <p>{` : `}</p>
                <p>{timer.minutesLeft} Mins</p>
                <p>{` : `}</p>
                <p>{timer.secondsLeft} Secs</p>
            </div>
            <div className = "resetButton">
                <button>Reset Timer</button>
            </div>
        </div>
    )
}

export default Timer;