import React, { Component } from "react";
import { mapStyle } from "../data/mapStyle.js";
import scriptLoader from "react-async-script-loader";
import PlacesList from "./PlacesList.js";
import InfoWindow from "./InfoWindow.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoWindow: {},
      infoWindowOpen: false,
      myMap: {},
      centerMap: {
        lat: -23.560245,
        lng: -46.657948
      },
      mapReady: false,
      mapError: false,
      screenWidth: window.innerWidth
    };
  }

  componentDidUpdate({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed && !this.state.mapReady) {
      let map = new window.google.maps.Map(document.getElementById("map"), {
        center: this.state.centerMap,
        zoom: 14,
        styles: mapStyle
      });

      const infoWindow = new window.google.maps.InfoWindow({ maxWidth: 300 });

      this.setState({
        myMap: map,
        mapReady: true,
        infoWindow: infoWindow
      });
    } else if (!this.state.mapReady) {
      this.setState({ mapError: true });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div id="container">
        <div id="header">São Paulo Brasil</div>
        <div id="menu">still empty</div>
        <div id="map">
          <p>Map is Loading</p>
        </div>
        <div className="footer">Powered by FourSquare</div>
      </div>
    );
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA_vkGYxkHZ4P1gcvKbu62XwvCEO96fVSY`
])(App);
