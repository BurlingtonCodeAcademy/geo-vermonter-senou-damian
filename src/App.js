import './App.css';
import { useState } from 'react'
import ButtonNav from './components/Buttonnav'
import ControlNav from './components/Controlnav'

import Map from './components/Map'

function App() {

  const [center, setCenter] = useState([43.88, -72.7317])

  return (
    <div>
      <Map center={center} />
      <ButtonNav />
      <ControlNav />
    </div>
  );
}

export default App;
