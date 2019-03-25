import React, { Component } from "react";
import { mapStyle } from "../data/mapStyle.js";
import scriptLoader from "react-async-script-loader";
import PlacesList from "./PlacesList.js";
import InfoWindow from "./InfoWindow.js";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id="container">
        <div id="header">São Paulo Brasil</div>
        <div id="menu">still empty</div>
        <div id="map">Map goes here</div>
        <div className="footer">Powered by FourSquare</div>
      </div>
    );
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_vkGYxkHZ4P1gcvKbu62XwvCEO96fVSY`
])(App);
