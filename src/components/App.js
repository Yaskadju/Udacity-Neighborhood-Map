import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import PlacesList from "./PlacesList.js";
import menu from "../images/menu.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoWindow: {},
      listOpen: true,
      showFiltered: true,
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

    this.toggleList = this.toggleList.bind(this);
  }

  componentDidUpdate({ isScriptLoadSucceed }) {
    const { mapError } = this.state;
    if (isScriptLoadSucceed && !this.state.mapReady) {
      let map = new window.google.maps.Map(document.getElementById("map"), {
        center: this.state.centerMap,
        zoom: 12,
        mapTypeControl: false
      });

      const infowindow = new window.google.maps.InfoWindow({ maxWidth: 320 });

      this.setState({
        myMap: map,
        mapReady: true,
        infoWindow: infowindow
      });
    } else if (!this.state.mapReady) {
      this.setState({ mapError: true });
    }
  }

  toggleList = () => {
    const { listOpen } = this.state;
    if (this.state.screenWidth < 800) {
      if (!listOpen) {
        this.state.infoWindow.close();
      }
      this.setState({ listOpen: !listOpen });
    }
  };

  checkListOpen = () => {
    const { listOpen, screenWidth } = this.state;
    if (listOpen && screenWidth < 800) {
      this.setState({ listOpen: false });
    }
  };

  render() {
    return (
      <div id="container" role="main">
        <h1 tabIndex="0">São Paulo - Brasil</h1>

        {this.state.screenWidth < 800 ? (
          <nav>
            <img
              className="menu-icon"
              src={menu}
              widht="25"
              height="25"
              tabIndex="0"
              onClick={this.toggleList}
            />
          </nav>
        ) : (
          " "
        )}

        <section
          id="listSection"
          className={this.state.listOpen ? "list-open" : "list-hide"}
          tabIndex={this.state.listOpen ? "0" : "-1"}
        >
          {this.state.mapReady ? (
            <PlacesList
              infoWindow={this.state.infoWindow}
              infowindowOpen={this.state.infowindowOpen}
              toggleList={this.toggleList}
              listOpen={this.state.listOpen}
              checkListOpen={this.checkListOpen}
              filterCategories={this.filterCategories}
              filterByName={this.filterByName}
              infoWindowOpen={this.state.infoWindowOpen}
              myMap={this.state.myMap}
              centerMap={this.state.centerMap}
              showFiltered={this.state.showFiltered}
            />
          ) : (
            <p>A problem ocurred...</p>
          )}
        </section>

        <section id="map">
          {this.state.mapError ? (
            <div id="maperror">
              <p>Google Maps is not loading...</p>
            </div>
          ) : (
            <div className="mapload">
              <p>Map is loading, please wait...</p>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA_vkGYxkHZ4P1gcvKbu62XwvCEO96fVSY`
])(App);
