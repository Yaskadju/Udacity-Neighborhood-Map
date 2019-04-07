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
      listOpen: true,
      mapReady: false,
      mapError: false,
      screenWidth: window.innerWidth,
      showFiltered: true
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

  checkListOpen = () => {
    const { listOpen, screenWidth } = this.state;
    if (listOpen && screenWidth < 800) {
      this.setState({ listOpen: false });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div id="container" role="main">
        <div id="header">
          <h1 tabIndex="0">São Paulo Brasil</h1>
        </div>
        <div id="menu" tabIndex="0">
          {this.state.mapReady ? (
            <PlacesList
              infoWindow={this.state.infoWindow}
              infoWindowOpen={this.state.infoWindowOpen}
              myMap={this.state.myMap}
              centerMap={this.state.centerMap}
              showFiltered={this.state.showFiltered}
            />
          ) : (
            <p>A problem ocurred, please try again...</p>
          )}
        </div>

        <div id="map">
          {this.state.mapError ? (
            <p>Google Maps is not loading, try to refresh the page</p>
          ) : (
            <p>Map is loading</p>
          )}
        </div>
        <div className="footer">Powered by FourSquare</div>
      </div>
    );
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA_vkGYxkHZ4P1gcvKbu62XwvCEO96fVSY`
])(App);
