//function to manipulate the map to center in on the random location and zoom in on it.

import { useMap } from "react-leaflet";

function MapManip({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default MapManip;
