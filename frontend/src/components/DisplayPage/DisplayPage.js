import { useRef, useState, useEffect } from 'react';
import {Route, useNavigate, useParams, useLocation} from 'react-router-dom';
import "./DisplayPage.css";
import axios from 'axios';
// import MainPage from "./components/MainPage/MainPage";

// const BACKEND_URL = 'http://localhost:5000/cover';



function DisplayPage() {

  console.log("DisplayPage");
  const {state} = useLocation();
  const {token, stateInfo, image, artist, album, release_date, username} = state;
  console.log(image, release_date, username);

  // var paramsString = window.location.href.split('#')[1];
  // const params = new URLSearchParams(paramsString); 

  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const [errStatus, setErrStatus] = useState(false);
  // const [success, setSuccess] = useState(false);

  // const [imgSrc, setImgSrc] = useState('');

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();

    try {
        let uu = "http://localhost:5000/SubmitImage";
        // const article = { 
        //   token: username,
        //   url: image,
        //   album: album,
        //   artist: artist,
        //   rel_date: release_date,
        // };
        // await axios.post(uu, article)
        // .then(response => console.log(response)
        // );

        // console.log("token: " + token, stateInfo);
        //send post request with aall data to link above
        navigate(
          "/loggedIn#access_token=" + token + "token_type=Bearer&expires_in=3600&state=" + stateInfo

        );

    } catch (response) {
        if (response === null || response === undefined) {
          setErrMsg('No Server Response');
        } else {
          setErrMsg('Date was invalid');
        }
        setErrStatus(true);
    }
  }

  const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <img src={image}/>
          
          <div className="input-container" justify>
            <label><h2> {album} </h2></label>
            </div>
            <div className="input-container">
            <label> <h2>{artist}</h2></label>
            </div>
            <div className="input-container">
            <label><h2> {release_date} </h2></label>
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
                <div className="title">On the release date of your album/song, this image was taken by NASA:</div>
                <div>{renderForm}</div>
            </div>
        </div> 
      </div>
    );
  }



export default DisplayPage;