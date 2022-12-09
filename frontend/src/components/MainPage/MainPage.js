import { useRef, useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import "./MainPage.css";

// const BACKEND_URL = 'http://localhost:5000/cover';


function MainPage() {
  

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

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [recordName, artistName])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let uu = "http://localhost:5000/nasaImage?album="+(recordName)+"&&artist="+(artistName)+"&&token="+(params.get("access_token"));
        
                 
        // console.log(uu);
        const response = await (await fetch(uu)).json();
        console.log(response);
        navigate(
          '/display/cover', 
          { 
            state: {
              token: params.get("access_token"),
              stateInfo: params.get("state"),
              image: response["image"],
              artist: artistName,
              album: recordName,
              release_date: response["release_date"],
              username: response["username"]
            }
          }
        );
        //console.log(JSON.stringify(response));
        // console.log(response["image"]);
        setRecordName('');
        setArtistName('');
        //we need to redirect this page  
        //navigate('/display/cover'); //navigate to new page
    } catch (response) {
        if (response === null || response === undefined) {
          setErrMsg('No Server Response');
        } else {
          setErrMsg('Album or Artist is invalid');
        }
        setErrStatus(true);
    }
  }

  const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="prompt">
            <p>Input the album/song title and the artist's name{<br></br>}  
              to generate a new Space themed music cover!
            </p>
          </div>
         
       
          <div className="input-container">
          <label>Album/Song Name: </label>
            <input
              type="text"
              id="recordName"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setRecordName(e.target.value)}
              value={recordName}
              required
          />
          </div>
          <div className="input-container">
          <label>Artist Name: </label>
            <input
              type="text"
              id="artistName"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setArtistName(e.target.value)}
              value={artistName}
              required
          />
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

export default MainPage;