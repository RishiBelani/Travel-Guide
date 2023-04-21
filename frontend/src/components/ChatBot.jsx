import React, { useState } from "react";
import Loader from "./Loader";
import Navbar from "../components/Navbar";
import '../styles/chatBot.css';
import ReactMarkdown from 'react-markdown';


//to use the openAI api for getting the trip planner 


const ChatBot = (props) => {


    const [gptCall, setGptCall] = useState({
        content: props.chatPrompt,
    });

    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(false);



    const handleSubmit = async () => {

        setLoading(true);

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            // body: JSON.stringify(gptCall),
            header: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'accept': 'application/json',
            }
        };

        fetch(`http://127.0.0.1:8000/chatgpt?content=${gptCall.content}&role=user`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                setReplies([...replies, result]);
                console.log(result);
                setLoading(false);
            })
            .catch(error => console.log('error', error));


        fetch(`http://localhost:8000/data`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'accept': 'application/json',
            }
        })
    };

    

    return (
        <>
            {loading && <Loader />}
            <div class="card">
                <div class="chat-header">Chat</div>
                <div class="chat-window">
                    <ul class="message-list">
                        {replies.map((reply, index) => (
                            <li class="message">
                                <div class="message-body">
                                    <code>{reply}</code>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div class="chat-input">
                    <input type="text" class="message-input" onChange={(e) => setGptCall({ ...gptCall, content: e.target.value })} placeholder="Type your message here" />
                    <button class="ui-btn" onClick={handleSubmit}>
                        <span>
                            Button
                        </span>
                    </button>
                </div>
            </div>

            {/* <img src="https://w7.pngwing.com/pngs/838/973/png-transparent-clown-3-graphy-clown-photography-clown-hat-april-thumbnail.png" alt="Joker Png" onClick={handleSubmit} /> */}

        </>
    );
};

export default ChatBot;
