import React from 'react';
import Navigation from './Navigation.js';

const Home = (props) => {

    return (
        <div className="landingPage">
            <Navigation/>
            <div className="mission">
                <h2>Our Mission Is Simple:</h2>
                <h2>To Help You Keep Your Plants Hydrated</h2>
                <h3>The process is very simple</h3>
            </div>
            <ul className="instructions">
                <li>Create an account with us, add your plants and set the interval.</li>
                <li>At the end of a set interval for each of your plants, we will send you a reminder to water your plants</li>
                <li>Once your receive our notification:</li>
                <ol>
                    <li>1. Water your plants</li>
                    <li>2. Log back into your account</li>
                    <li>3. Reset the timer</li>
                    <li>4. You are done!</li>
                </ol>
            </ul>
        </div>
    )
}

export default Home;