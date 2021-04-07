import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Polyline,
} from "react-leaflet";
import borderData from "../data/border";
import L from "leaflet";
import leafletPip from "leaflet-pip";
import { useState } from "react";

import MapManip from "./MapManip";

//Core map functionality
function Map(props) {
  //Sets the center coordinates for Vermont
  const [innitCenter, setInnitCenter] = useState([43.88, -72.7317]);
  //Standard zoom level before the game starts, shows all of Vermont
  const [zoom, setZoom] = useState(8);
  //Assigns the mapManip function to start at the same place as innitCenter
  const [mapManip, setMapManip] = useState([43.88, -72.7317]);
  //Stops infinite loop after setting map point
  const [stopInnit, setStopInnit] = useState(true);
  //VT Border Outline
  let vtOutline = borderData.geometry.coordinates[0].map((coords) => [
    coords[1],
    coords[0],
  ]);

  //Start Game => Find point within border
  if (props.initialize === true && stopInnit) {
    setInnitPoint();
    setStopInnit(false);
  }

  //Find initial coordinates//
  function setInnitPoint() {
    let innitLat;
    let innitLong;
    //RNG to assign a longitude that more often than not lands the pin inside Vermont.
    function randLong() {
      innitLong = Math.random().toPrecision(8) * (-72 + 74 + 1) - 74;
    }
    //RNG to assign a latitude that more often than not lands the pin inside Vermont.
    function randLat() {
      innitLat = Math.random().toPrecision(8) * (46 - 43) + 42;
    }
    //Border Data
    let stateLayer = L.geoJSON(borderData);
    //Log to check if the coordinates are being located.
    console.log("We are finding the coords");
    randLat();
    randLong();

    //Leaflet Pip (Inverse Coordinates//
    let innitLongLat = [innitLong, innitLat];
    //Center Point
    let innitLatLong = [innitLat, innitLong];
    //Is point within boundaries//
    let results = leafletPip.pointInLayer(innitLongLat, stateLayer);

    //when the map point is determined to be within the boundary of Vermont, function inserts map point at the lat and long
    function setPoint() {
      if (results.length === 1) {
        console.log("results = 1", results);
        setInnitCenter(innitLatLong);
        setZoom(16);
        setMapManip(innitLatLong);
      }
    }
    //while the generated point is outside Vermont, it tosses the point out and tries again.
    while (results.length === 0) {
      if (results.length === 0) {
        console.log("inwhileloop");

        randLat();
        randLong();
        //reassigns the combined array into a variable
        innitLongLat = [innitLong, innitLat];
        innitLatLong = [innitLat, innitLong];

        results = leafletPip.pointInLayer(innitLongLat, stateLayer);

        //Sets a point when the coordinates are within desirable parameters
        if (results.length === 1) {
          setPoint();
        }
      }
    }
  }

  return (
    <MapContainer
      center={innitCenter}
      zoom={zoom}
      doubleClickZoom={false}
      zoomControl={false}
      touchZoom={false}
      style={{ height: "600px", width: "600px" }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />
      <MapManip center={mapManip} zoom={zoom} />
      <Marker position={innitCenter} />

      <Polygon
        positions={vtOutline}
        pathOptions={{ color: "orange", fillOpacity: 0 }}
      />
    </MapContainer>
  );
}

export default Map;
