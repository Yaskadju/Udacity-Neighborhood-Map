import React, { Component } from "react";
import PropTypes from "prop-types";
import { getFSvenues, getFSdetails } from "../data/data.js";
import { gatherContent, createInfowindow } from "../data/placeDetails.js";

class PlacesList extends Component {
  static propTypes = {
    listOpen: PropTypes.bool.isRequired,
    infoWindow: PropTypes.object.isRequired,
    // infowindowOpen: PropTypes.bool.isRequired,
    myMap: PropTypes.object.isRequired,
    centerMap: PropTypes.object.isRequired,
    toggleList: PropTypes.func.isRequired,
    showFiltered: PropTypes.bool.isRequired,
    checkListOpen: PropTypes.func.isRequired
  };

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
    const { venues } = this.state;

    venues.map(venue => {
      venue.marker = new window.google.maps.Marker({
        map: myMap,
        position: venue.location,
        title: venue.name,
        animation: window.google.maps.Animation.DROP,
        id: venue.id,
        open: false
      });

      venue.marker.addListener("click", function() {
        const marker = this;

        getFSdetails(marker.id)
          .then(data => {
            gatherContent(marker, data);
            createInfowindow(marker);
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

    this.props.infoWindow.close();

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

    this.props.infoWindow.close();

    const filteredCategories = venues.filter(venue => {
      const venueCategory = venue.categories;
      let categoryName = venueCategory.map(category => category.name)[0];

      categoryName =
        categoryName === "Outdoor Sculpture" ||
        categoryName === "Monument / Landmark" ||
        categoryName === "Scenic Lookout" ||
        categoryName === "Garden" ||
        categoryName === "City Hall" ||
        categoryName === "Historic Site" ||
        categoryName === "Bridge" ||
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
    const { listOpen } = this.props;
    const { filteredList } = this.state;

    return (
      <div>
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
