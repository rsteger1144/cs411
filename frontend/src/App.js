import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
//import DisplayPage from "./components/DisplayPage/DisplayPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/display" element={<MainPage />} />
            <Route exact path="/" element={<MainPage />} />
            {/* <Route exact path="/login" element={<Login />} />    */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
