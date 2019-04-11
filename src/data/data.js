import { clientId, clientSecret } from "../data/clientInfo.js";

const placesCategories = [
  { key: "Museum", value: "4bf58dd8d48988d181941735" },
  { key: "Historic Site", value: "4deefb944765f83613cdba6e" },
  { key: "Scenic Outlook", value: "4bf58dd8d48988d165941735" },
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

const versionDate = 20180606;

export const getFSvenues = mapCenter => {
  const urlRequest = `https://api.foursquare.com/v2/venues/search?ll=${
    mapCenter.lat
  },${
    mapCenter.lng
  }&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}&categoryId=${placesIds}&radius=1500&limit=70`;

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

export const getFSdetails = fsid => {
  const fourSqId = fsid;
  const detailsUrl = `https://api.foursquare.com/v2/venues/${fourSqId}?client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`;

  return fetch(detailsUrl)
    .then(response => {
      if (!response.ok) {
        console.log("Error when retrieving venues");
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log(data.response);
      return data.response;
    });
};
