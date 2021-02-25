import './App.css';
import { useState } from 'react'
import ButtonNav from './components/Buttonnav'
import ControlNav from './components/Controlnav'
import Info from './components/Info'
import Map from './components/Map'


import Start from "./components/Start";
import Quit from "./components/Quit";
import Guess from "./components/Guess";

function App(props) {

  const [center, setCenter] = useState([43.88, -72.7317])
  
  function startCenter (evt) {
    setCenter([44.4761601,-73.212906])
  }

    //Toggles Start and Quit/Guess buttons
    const [isStarted, setStart] = useState(false);

    function toggleStart(evt) {
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
      startDiv = <Start startToggle={toggleStart} startCenter={startCenter} />;
    }

  return (
    <div>
      <Info />
      <Map center={center} />
      <ButtonNav />
      {startDiv} 

    </div>
  );
}

export default App;
