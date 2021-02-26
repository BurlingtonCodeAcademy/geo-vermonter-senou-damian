import North from './North'
import South from './South'
import East from './East'
import West from './West'


function ButtonNav(props) {

    return (
        <div>
            <North northClick={props.northClick} />
            <East eastClick={props.eastClick}/>
            <South southClick={props.buttClick}/>
            <West westClick={props.buttClick}/>
        </div>
    )

}

export default ButtonNav