import Start from "./Start";
import Quit from "./Quit";
import Guess from "./Guess";

import { useState } from "react";

function ControlNav(props) {
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
    startDiv = <Start startToggle={toggleStart}  />;
  }
  //<----- Return----->//
  return <div>{startDiv}</div>;
}

export default ControlNav;
