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

function Map(props) {
  const [innitCenter, setInnitCenter] = useState([43.88, -72.7317]);
  const [zoom, setZoom] = useState(8);
  const [mapManip, setMapManip] = useState([43.88, -72.7317]);
  const [stopInnit, setStopInnit] = useState(true)

  let vtOutline = borderData.geometry.coordinates[0].map((coords) => [
    coords[1],
    coords[0],
  ]);

  if (props.initialize === true && stopInnit) {
    setInnitPoint();
     setStopInnit(false)
  }

  //LeafPip checker//
  function setInnitPoint() {
    let innitLat;
    let innitLong;

    function randLong() {
      innitLong = Math.random().toPrecision(8) * (-72 + 74 + 1) - 74;
    }

    function randLat() {
      innitLat = Math.random().toPrecision(8) * (46 - 43) + 42;
    }

    let stateLayer = L.geoJSON(borderData);

    console.log("wazzzzaa");
    randLat();
    randLong();

    //Leaflet Pip (Inverse Coordinates//
    let innitLongLat = [innitLong, innitLat];
    //Center Point
    let innitLatLong = [innitLat, innitLong];
    //Is point within boundaries//
    let results = leafletPip.pointInLayer(innitLongLat, stateLayer);

    function setPoint() {
      if (results.length === 1) {
        console.log("results = 1", results);
        setInnitCenter(innitLatLong);
        setZoom(16);
        setMapManip(innitLatLong);
      }
    }

    while (results.length === 0) {
      if (results.length === 0) {
        console.log("inwhileloop");

        randLat();
        randLong();

        innitLongLat = [innitLong, innitLat];
        innitLatLong = [innitLat, innitLong];
        results = leafletPip.pointInLayer(innitLongLat, stateLayer);

        if (results.length === 1) {
          setPoint();
        }
      }
    }
  }

  //Movement//

  // if(props.northMove){
  //   setMapManip(//current latitutde +.002)
  // }

  return (
    //REMEMBER => MAP COINTAINER IMMUTABLE
    <MapContainer
      center={innitCenter}
      zoom={zoom}
      // dragging={false}
      // scrollWheelZoom={false}
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
