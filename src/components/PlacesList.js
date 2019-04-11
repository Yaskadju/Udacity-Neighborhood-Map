import React, { Component } from "react";
import PropTypes from "prop-types";
import { getFSvenues, getFSdetails } from "../data/data.js";
import { gatherContent, createInfoWindow } from "../data/placeDetails.js";
import categories from "../data/categories.js";

class PlacesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      filteredList: [],
      query: "",
      categories: []
    };
  }

  componentDidMount() {
    getFSvenues(this.props.centerMap).then(xvenues => {
      this.setState({
        venues: xvenues,
        filteredList: xvenues
      });
      if (xvenues) {
        this.createMarkers(xvenues);
      }
    });
  }

  createMarkers(xvenues) {
    const { myMap, infoWindow, checkListOpen } = this.props;

    this.state.venues.map(venue => {
      venue.marker = new window.google.maps.Marker({
        map: myMap,
        position: venue.location,
        title: venue.name,
        animation: window.google.maps.Animation.DROP,
        id: venue.id,
        open: false
      });

      venue.marker.addListener("click", () => {
        const marker = this;

        getFSdetails(marker.id)
          .then(data => {
            gatherContent(marker, data);
            createInfoWindow(marker);
          })
          .then(() => {
            infoWindow.setContent(marker.content);
            infoWindow.open(myMap, marker);
          })
          .catch(() => {
            console.log("Error opening the info for this marker");
          });
        checkListOpen();
      });
    });
  }

  filterByName = event => {
    const { venues } = this.state;
    const { infoWindow } = this.props;

    infoWindow.close();

    const query = event.target.value.toLowerCase();

    this.setState({
      query: query
    });

    const filteredMarkers = venues.filter(venue => {
      const matches = venue.name.toLowerCase().indexOf(query) > -1;
      venue.marker.setVisible(matches);
      return matches;
    });

    this.setState({
      filteredList: filteredMarkers
    });
  };

  filterByCategory = filterObj => {
    const { venues, categories } = this.state;
    const { infoWindow } = this.props;

    infoWindow.close();

    const filteredCategories = venues.filter(venue => {
      const venueCategory = venue.categories;
      let categoryName = venueCategory.map(category => category.name)[0];

      categoryName =
        categoryName === "Food" ||
        categoryName === "Museum" ||
        categoryName === "PublicArt" ||
        categoryName === "Bar" ||
        categoryName === "Hotel" ||
        categoryName === "Office" ||
        categoryName === "Library" ||
        categoryName === "Cultural Center"
          ? "Others"
          : categoryName;

      const matches = categoryName
        .toLowerCase()
        .includes(filterObj.toLowerCase());
      venue.marker.setVisible(matches);
      return matches;
    });

    this.setState({
      filteredList: filteredCategories
    });
  };

  openInfoWindow = venue => {
    const { toggleList, listOpen } = this.props;
    window.google.maps.event.trigger(venue.marker, "click");
  };

  render() {
    //const categories = ["Museum", "Church", "Bar", "Others"];

    const { listOpen } = this.props;
    const { filteredList } = this.state;

    return (
      <div>
        <ul className="categories">
          {categories.map(name => (
            <li
              key={name}
              role="button"
              tabIndex={listOpen ? "0" : "-1"}
              onClick={() => this.filterByCategory(name)}
              onKeyPress={() => this.filterByCategory(name)}
            >
              {name}
            </li>
          ))}
        </ul>
        <input
          id="filter-places"
          role="search"
          type="text"
          tabIndex={listOpen ? "0" : "-1"}
          data-bind="textInput: filter"
          placeholder="Filter locations by name "
          onChange={this.filterByName}
        />

        <ul className="placeList" role="listbox">
          {filteredList.map(venue => (
            <li
              key={venue.id}
              role="option"
              tabIndex={listOpen ? "0" : "-1"}
              onClick={() => this.openInfoWindow(venue)}
              onKeyPress={() => this.openInfoWindow(venue)}
            >
              {venue.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PlacesList;
