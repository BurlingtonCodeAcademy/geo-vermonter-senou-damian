import North from './North'
import South from './South'
import East from './East'
import West from './West'

// import { useState } from 'react'

function ButtonNav(props) {


    return (
        <div>
            <North northClick={props.buttClick} />
            <East eastClick={props.buttClick}/>
            <South southClick={props.buttClick}/>
            <West westClick={props.buttClick}/>
        </div>
    )

}

export default ButtonNav