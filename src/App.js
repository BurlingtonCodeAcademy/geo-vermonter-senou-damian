import "./App.css";
import { useState } from "react";
import Info from "./components/Info";
import Map from "./components/Map";

import ButtonNav from "./components/Buttonnav";
import Start from "./components/Start";
import Quit from "./components/Quit";
import Guess from "./components/Guess";


function App(props) {
//Press start => find drop point/zoom on map
const [initialize, setInitialize] = useState(false)

//Scorekeeper
const [counter, setCounter] = useState(100)

//Movement Buttons
const [northMove, setNorthMove] = useState()
const [eastMove, setEastMove] = useState()
const [southMove, setSouthMove] = useState()
const [westMove, setWestMove] = useState()

////Click start///
function startClick (evt) {
  toggleStart()
  setInitialize(true)
}

//Toggles Start and Quit/Guess buttons
  const [isStarted, setStart] = useState(false);
  function toggleStart() {
    setStart(!isStarted);
  }
  let startDiv;
  if (isStarted) {
    startDiv = (
      <div>
        <Quit quitToggle={toggleStart} />
        <Guess />
      </div>
    );
  } else {
    startDiv = <Start startClick={startClick} />;
  }

//Movement Functions
function northClick(){
  incrementCounter()

}
function eastClick(){
  incrementCounter()

}
//Scorekeeper F(x)//
function incrementCounter(evt) {
 setCounter(counter - 1)
}




  return (
    <div id="landing-page">
      <Info />

      <div id="map-container">
        <Map initialize={initialize}  />
      </div>

      <div id="button-container">
      <ButtonNav northClick={northClick} eastClick={eastClick}/>
      {startDiv}
      </div>

      <div id="counter">{counter}</div>

    </div>


  );
}

export default App;
