import "./App.css";
import { useState } from "react";
import ButtonNav from "./components/Buttonnav";
import Info from "./components/Info";
import Map from "./components/Map";

import Start from "./components/Start";
import Quit from "./components/Quit";
import Guess from "./components/Guess";


function App(props) {

const [marker, setMarker] = useState([43.88, -72.7317]);
const [mapManipCenter, setMapManipCenter] = useState([43.88, -72.7317]) //[44.4761601, -73.212906]
const [mapManipZoom, setMapManipZoom] = useState(8)//16
const [counter, setCounter] = useState(100)


const [northMove, setNorthMove] = useState(mapManipCenter[0])
const [eastMove, setEastMove] = useState()
const [southMove, setSouthMove] = useState()
const [westMove, setWestMove] = useState()

////Change view => useMap hook///
function startClick (evt) {
  startMarker()
  toggleStart()
  setMapManipCenter([44.4761601, -73.212906])
  setMapManipZoom(16)
}

//Set Initial Marker
  function startMarker() {
    setMarker([44.4761601, -73.212906]);
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

//Counter FX//
function incrementCounter(evt) {
 setCounter(counter - 1)
}




  return (
    <div id="landing-page">
      <Info />

      <div id="map-container">
        <Map marker={marker} center={mapManipCenter} zoom={mapManipZoom} />
      </div>

      <div id="button-container">
      <ButtonNav buttClick={incrementCounter}/>
      {startDiv}
      </div>

      <div id="counter  ">{counter}</div>

    </div>


  );
}

export default App;
