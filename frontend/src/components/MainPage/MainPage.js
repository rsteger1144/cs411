import { useRef, useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import "./MainPage.css";

const BACKEND_URL = 'http://localhost:5000/cover';

function MainPage() {
  let {access_token, token_type,expires_in,state} = useParams();

  console.log(access_token, token_type,expires_in,state);
  const navigate = useNavigate();
  const userRef = useRef();

  const [recordName, setRecordName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [errStatus, setErrStatus] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [recordName, artistName])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({"title": recordName, "artist_name":artistName})
        };
        const response = await (await fetch(BACKEND_URL, requestOptions)).json();
        console.log(JSON.stringify(response));

        if(!Number.isInteger(response)) {
          throw response;
        }
        setRecordName('');
        setArtistName('');
        setSuccess(true);
        navigate('/display');
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
  
  return (
      <div>
        <div className="app">
            <div className="main-page">
                <div className="title">Main Page</div>
                {success ? <></> : renderForm}
            </div>
        </div> 
      </div>
    );
}

export default MainPage;