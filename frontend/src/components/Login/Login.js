import { useRef, useState, useEffect } from 'react';
import {redirect, useNavigate} from 'react-router-dom';
import "./Login.css";

// import express from 'express';
import querystring from 'querystring';
const BACKEND_URL = 'http://localhost:5000/cover';

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

function Login() {

    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const [errStatus, setErrStatus] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        // e.preventDefault();
    
        try {

            var client_id = "f6cb0946bed04a7a869ebb90027a3527";
            var scope = 'user-read-private user-read-email';
            var redirect_uri = 'http://localhost:3000/loggedIn';
            var state = generateRandomString(16);

            const queryParams = {
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            };

            var spotifyUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify(queryParams);
            // const response = await redirect(spotifyUrl);

            console.log(spotifyUrl);

            // navigate(spotifyUrl);
            window.open(spotifyUrl);
            // console.log(JSON.stringify(response));
            // console.log(response);
            // Window.location.href = spotifyUrl;

            } catch (response) {
                if (response === null || response === undefined) {
                    setErrMsg('No Server Response');
                } else {
                    
                    setErrMsg('Date was invalid');
                }
                // setErrStatus(true);
            }
            setSuccess(true);
        }
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
            <div className="prompt">
                <p>Click button to log into Spotify
                {/* {<br></br>}   */}
                </p>
            </div>
            
            <div className="button-container">
                <input type="submit" />
            </div>
            <div className="error">
                {errStatus ? <div> {errMsg} </div> : <></>}
            </div>
            </form>
        </div>
    );

    return (
    <div>
        <div className="app">
            <div className="main-page">
                <div className="title">Login Page</div>
                {success ? <></> : renderForm}
            </div>
        </div> 
    </div>
    );
}

export default Login;