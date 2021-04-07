import Start from "./Start";
import Quit from "./Quit";
import Guess from "./Guess";

import { useState } from "react";

function ControlNav(props) {
  //Toggles Start and Quit/Guess buttons

  const [marker, setMarker] = useState([43.88, -72.7317]);

  ////Change view => useMap hook///
  function startClick(evt) {
    startMarker();
    toggleStart();
  }
  //Starting marker puts us in downtown Burlington
  function startMarker() {
    setMarker([44.4761601, -73.212906]);
  }

  //Toggles Start and Quit/Guess buttons
  const [isStarted, setStart] = useState(false);
  function toggleStart() {
    setStart(!isStarted);
  }
  //checks if the game is started and if it has, prevents us from starting the game again
  let startDiv;
  if (isStarted) {
    startDiv = (
      <div>
        <Quit quitToggle={toggleStart} />
        <Guess />
      </div>
    );
    //If the game hasn't started, this allows us to start it
  } else {
    startDiv = <Start startClick={startClick} />;
  }

  return <div>{startDiv}</div>;
}

export default ControlNav;
