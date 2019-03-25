import React, { Component } from "react";
import { mapStyle } from "../data/mapStyle.js";
import scriptLoader from "react-async-script-loader";
import PlacesList from "./PlacesList.js";
import InfoWindow from "./InfoWindow.js";

class App extends Component {
  render() {
    return (
      <div className="Container">
        <h1>São Paulo Brasil</h1>
      </div>
    );
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_vkGYxkHZ4P1gcvKbu62XwvCEO96fVSY`
])(App);
