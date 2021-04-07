import North from "./North";
import South from "./South";
import East from "./East";
import West from "./West";

//Navigation toolbar that when clicked, activates the respective function to move in that direction
function ButtonNav(props) {
  return (
    <div>
      <North northClick={props.northClick} />
      <East eastClick={props.eastClick} />
      <South southClick={props.buttClick} />
      <West westClick={props.buttClick} />
    </div>
  );
}

export default ButtonNav;
