import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/hero_section.css';
import Loader from "./Loader";

//the hero section is the section that takes in the preference of the travel location along with a hero text and goes to the next page 

//this has 2 parts one is the hero text and the other is the part where it takes the input as a form from the user to where he is going to travel next along with his bugdet and number of days to travel

const Hero_Section = () => {
    const navigation = useNavigate();
    const [travelDetails, setTravelDetails] = useState({
        from: '',
        to: '',
        budget: '',
        travel_date: '',
        return_date: '',
    });

    console.log(travelDetails);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(`http://127.0.0.1:8000/flights?originLocationCode=${travelDetails.from}&destinationLocationCode=${travelDetails.to}&departureDate=${travelDetails.travel_date}&adults=1`);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            // credentials: 'same-origin',
            body: JSON.stringify({ originLocationCode: travelDetails.from, destinationLocationCode: travelDetails.to, departureDate: travelDetails.travel_date, adults: 1 }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'accept': 'application/json'
            }

        };
        console.log(`http://127.0.0.1:8000/flights?originLocationCode=${travelDetails.from}&destinationLocationCode=${travelDetails.to}&departureDate=${travelDetails.travel_date}&adults=1`);
        fetch("http://127.0.0.1:8000/flights", requestOptions)
            .then(response => response.text())
            .then(response => {
                console.log(response)
                setLoading(false);
                //pass the response to Flight.jsx

                navigation('/flight', { state: { data: response } });
                <Link to="/flight" state={{ data: response }} />

        })
            .catch(error => console.log('error', error));


    }


   

    return (
        <React.Fragment>
            {loading && <Loader />}

            <div className="hero_section">
                <div className="hero_text">
                    <h1>Where do you want to go next?</h1>
                    <p>Find the best places to visit and things to do in your next destination.</p>
                </div>
                <div className="hero_form">
                    <div class="modal">
                        <form class="form">

                            <div className="form-header">
                                <h2>Plan your next trip</h2>
                            </div>


                            <div class="credit-card-info--form">
                                <div className="split">
                                    <div class="input_container">
                                        <label for="traveller-destination" className="input_label">From</label>
                                        <input id="traveller-destination" className="input_field" type="text" name="input-name" title="Inpit title" placeholder="Enter your location of travel" value={travelDetails.destination} onChange={(e) => setTravelDetails({ ...travelDetails, from: e.target.value })} required />
                                    </div>

                                    <div class="input_container">
                                        <label for="traveller-destination" className="input_label">To</label>
                                        <input id="traveller-destination" className="input_field" type="text" name="input-name" title="Inpit title" placeholder="Enter your preferred destination" value={travelDetails.destination} onChange={(e) => setTravelDetails({ ...travelDetails, to: e.target.value })} required />
                                    </div>
                                </div>
                                <div class="input_container">
                                    <label for="traveller-budget" class="input_label">Whats your budget for the trip</label>
                                    <input id="travaller-budget" class="input_field" type="number" name="input-name" title="Inpit title" placeholder="Enter the money you can spend " value={travelDetails.budget} onChange={(e) => setTravelDetails({ ...travelDetails, budget: e.target.value })} required />
                                </div>
                                <div className="split">
                                    <div class="input_container">
                                        <label for="Number-of-days" class="input_label">Travel Date</label>

                                        <input id="Number-of-days" class="input_field" type="date" name="input-name" title="Expiry Date" placeholder="2023-04-20" value={travelDetails.days} onChange={(e) => setTravelDetails({ ...travelDetails, travel_date: e.target.value })} required />
                                    </div>
                                    <div class="input_container">
                                        <label for="Number-of-days" class="input_label">Return Date</label>

                                        <input id="Number-of-days" class="input_field" type="date" name="input-name" title="Expiry Date" data-date-format="YYYY MM DD" placeholder="2023-04-20" value={travelDetails.days} onChange={(e) => setTravelDetails({ ...travelDetails, return_dates: e.target.value })} required />
                                    </div>
                                </div>
                            </div>
                            <button class="purchase--btn" onClick={handleSubmit}>Get my Plan</button>
                        </form>
                    </div>

                </div>
            </div >
        </React.Fragment >
    );
}

export default Hero_Section;