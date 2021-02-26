import "./App.css";
import { useState } from "react";
import ButtonNav from "./components/Buttonnav";
import Info from "./components/Info";
import Map from "./components/Map";

import Start from "./components/Start";
import Quit from "./components/Quit";
import Guess from "./components/Guess";


function App(props) {

const [initialize, setInitialize] = useState(false)
const [counter, setCounter] = useState(100)


const [northMove, setNorthMove] = useState()
const [eastMove, setEastMove] = useState()
const [southMove, setSouthMove] = useState()
const [westMove, setWestMove] = useState()

////Change view => useMap hook///
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


function northClick(){
  incrementCounter()

}
function eastClick(){
  incrementCounter()

}
//Counter FX//
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
