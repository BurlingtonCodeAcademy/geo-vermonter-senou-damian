import { MapContainer, TileLayer, Polygon, Marker, Polyline } from "react-leaflet";
import borderData from "../data/border";
import L from 'leaflet'
import leafletPip from 'leaflet-pip'
import { useState } from 'react'

import MapManip from './MapManip'



function Map(props) {
  let vtOutline = borderData.geometry.coordinates[0].map(coords => [coords[1], coords[0]])
  
  
  let innitLat
  let innitLong

  function randLong(){
    innitLong = ((Math.random().toPrecision(8))*(-72 + 74 + 1) - 74)
  }
  function randLat(){
    innitLat = ((Math.random().toPrecision(8)*(46 - 43)+ 42))
  }
  let stateLayer = L.geoJSON(borderData)
  randLat()
  randLong()
  let innitLongLat = [innitLong, innitLat]
  let results = leafletPip.pointInLayer(innitLongLat, stateLayer)

  while(results.length === 0){
  if(results.length === 0){
    console.log("Your point is out of bounds")
    randLat()
    randLong()
    innitLongLat = [innitLong, innitLat]
    results = leafletPip.pointInLayer(innitLongLat, stateLayer)
    
    console.log("REF: new result: " , results)
    console.log("REF: new result: " , innitLongLat)
  } else if (results.length === 1 ){
    console.log("Your point is in bounds boiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    
  }
}
    

  console.log("REF: innitLat: ", innitLat)
  console.log("REF: innitLong: ", innitLong)
  console.log("REF: innitLongLat: ", innitLongLat)
  console.log("REF: results: ", results)


  return (
    //REMEMBER => MAP COINTAINER IMMUTABLE
    <MapContainer
      center={props.marker}
      zoom={props.zoom}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      touchZoom={false}
      style={{ height: "600px", width: "600px" }}
    >
      <MapManip center={props.center} zoom={props.zoom} />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />
      <Marker position={props.marker} />
      
      <Polygon
        positions={vtOutline}
        pathOptions={{ color: "orange", fillOpacity: 0 }}
      />
    </MapContainer>
  );
}

export default Map;
