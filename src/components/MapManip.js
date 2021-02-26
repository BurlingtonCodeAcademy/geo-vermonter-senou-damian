import { useMap } from 'react-leaflet'

function MapManip ({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
  }

export default MapManip
  
  