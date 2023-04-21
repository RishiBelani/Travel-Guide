
import React, { useState } from "react";


import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";

const Flight = (props) => {
    const data = props;
    console.log(data);

    const [promptText, setPromptText] = useState("");
    const [gptCall, setGptCall] = useState({
        content: "",
    });
    //fetch API for getting data from server 

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8000/prompt", requestOptions)
        .then(response => response.text())
        .then(response => {
            // console.log(response)
            setPromptText(response);
            console.log(promptText)
        })
        .catch(error => console.log('error', error));


    //fetch the fastAPI endpoint for the detials of the flight
    const [flight, setFlight] = useState([]);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8000/data", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            setFlight(result);
        })
        .catch(error => console.log('error', error));



    return (
        <>
            <Navbar />
            <ChatBot chatPrompt={promptText} />

            {/* <div className="Flight-Tables">
                {/*Make me a table */}
            {/* <th>
                    <td>Departure Destination</td>
                    <td>Arrival Destination</td>
                    <td>Departure Time</td>
                    <td>Arrival Time</td>
                    <td>Duration</td>
                    <td>Class</td>
                    <td>Price</td>
                    <td>Carrier</td>
                </th>

                <tr>
                    <td>{flight[0]}</td>
                </tr> */}
            {/*</div > */}


        </>
    )
}

export default Flight;