import { useRef, useState, useEffect } from 'react';
import {Route, useNavigate, useParams, useLocation} from 'react-router-dom';
import "./DisplayPage.css";
// import MainPage from "./components/MainPage/MainPage";

// const BACKEND_URL = 'http://localhost:5000/cover';


function DisplayPage() {
  
  console.log("DisplayPage");
  const {state} = useLocation();
  const { image, release_date, username} = state;
  console.log(image, release_date, username);


  // console.log(window.location.href);
  var paramsString = window.location.href.split('#')[1];
  const params = new URLSearchParams(paramsString); 
  
  // console.log(params.get("access_token"));
  // console.log(params.get("token_type"));
  // console.log(params.get("expires_in"));
  // console.log(params.get("state"));

  const navigate = useNavigate();
  const userRef = useRef();

  const [recordName, setRecordName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [errStatus, setErrStatus] = useState(false);
  const [success, setSuccess] = useState(false);

  const [imgSrc, setImgSrc] = useState('');

  // useEffect(() => {
  //     userRef.current.focus();
  // }, [])

  useEffect(() => {
      setErrMsg('');
  }, [recordName, artistName])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let uu = "http://10.0.0.44:5000/nasaImage?album="+(recordName)+"&&artist="+(artistName);
        
                 
        // console.log(uu);
        const response = await (await fetch(uu)).json();
        //console.log(JSON.stringify(response));
        // console.log(response["image"]);
        setRecordName('');
        setArtistName('');
        // setSuccess(true);
        //THIS CODE WILL BE MOVED
        // let img = document.createElement("img");
        console.log(response["image"]);
        setImgSrc(response["image"]);
       // img.style.border = "10px solid white";
       // img.style.borderRadius = "10px";
        // document.body.appendChild(img);
        //THIS CODE WILL BE MOVED^

        //NAVIGATE TO DISPLAY PAGE WITH RESPONSE DATA
        //navigate('/display'); //navigate to new page
    } catch (response) {
        if (response === null || response === undefined) {
          setErrMsg('No Server Response');
        } else {
          setErrMsg('Date was invalid');
        }
        setErrStatus(true);
    }
  }

    const insertImg=(e) =>{
    let img = document.createElement("img");
          setImgSrc("https://apod.nasa.gov/apod/image/1605/ngc7023pelliccia_q100_watermark1024.jpg");
          img.style.border = "10px solid white";
          img.style.borderRadius = "10px";
          document.body.appendChild(img);
  }

  const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="render-image">
          <label>Album/Song Name: </label>  
          {insertImg}
          </div>
          <div className="Album">
          <label>Album Name:{recordName}</label>
          </div>
          <div className="Album">
          <label>Artist Name:{artistName}</label>
          </div>
          {/* <div className="ReleaseDate">
          <label>Artist Name:{artistName}</label>
          </div> */}
          <div className="button-container">
            <input type="submit" />
          </div>
          <div className="error">
            {errStatus ? <div> {errMsg} </div> : <></>}
          </div>
          

        
      
        </form>
        
      </div>

    );

    //     function bigImg(x) {
    //       x.style.height = "64px";
    //       x.style.width = "64px";
    //     }
        
    //     function normalImg(x) {
    //       x.style.height = "32px";
    //       x.style.width = "32px";
    //     }
  
  return (
      <div>
        <div className="app">
            <div className="main-page">
                <div className="title">Main Page</div>
                {renderForm}
            </div>
        </div> 
      </div>
    );
  }


export default DisplayPage;