import { clientId, clientSecret } from "../data/clientInfo.js";

const categories = [
  { key: "food", value: "4d4b7105d754a06374d81259" },
  { key: "museum", value: "4bf58dd8d48988d181941735" },
  { key: "publicArt", value: "507c8c4091d498d9fc8c67a9" },
  { key: "bar", value: "4bf58dd8d48988d116941735" },
  { key: "plaza", value: "4bf58dd8d48988d164941735" },
  { key: "church", value: "4bf58dd8d48988d132941735" },
  { key: "hotel", value: "4bf58dd8d48988d1fa931735" }
];

const placesCategories = [
  { key: "Museum", value: "4bf58dd8d48988d181941735" },
  // {key: "Public Art", value: "507c8c4091d498d9fc8c67a9"},
  { key: "Historic Site", value: "4deefb944765f83613cdba6e" },
  { key: "Scenic Outlook", value: "4bf58dd8d48988d165941735" },
  // {key: "Art Museum", value: "4bf58dd8d48988d18f941735"},
  { key: "Church", value: "4bf58dd8d48988d132941735" },
  { key: "Plaza", value: "4bf58dd8d48988d164941735" },
  { key: "History Museum", value: "4bf58dd8d48988d190941735" }
];

export const placesNames = placesCategories.map(key => {
  return key.key;
});

const placesIds = placesCategories.map(value => {
  return value.value;
});

export const categoryName = categories.map(key => {
  return key.key;
});

const categoryId = categories.map(value => {
  return value.value;
});

const versionDate = 20180606;

export const getFSvenues = mapCenter => {
  const urlRequest = `https://api.foursquare.com/v2/venues/search?ll=${
    mapCenter.lat
  },${
    mapCenter.lng
  }&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}&categoryId=${placesIds}&radius=1600&limit=50`;

  return fetch(urlRequest)
    .then(response => {
      if (!response.ok) {
        console.log("An error ocurred when trying to retrieve the venues");
      } else {
        return response.json();
      }
    })
    .then(data => {
      const venues = data.response.venues.filter(venue => {
        return venue.location.address && venue.location.city;
      });
      return venues;
    });
};

export const getFSdetails = fsId => {
  const detailsUrl = `https://api.foursquare.com/v2/venues/${fsId}?client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`;

  return fetch(detailsUrl)
    .then(response => {
      if (!response.ok) {
        console.log("An error ocurred when trying to retrieve the venues");
      } else {
        return response.json();
      }
    })
    .then(data => {
      return data.response;
    });
};
