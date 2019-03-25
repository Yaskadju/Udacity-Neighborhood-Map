import { clientId, clientSecret } from "../data/clientInfo.js";

const categories = [
  { key: "Food", value: "4d4b7105d754a06374d81259" },
  { key: "Museum", value: "4bf58dd8d48988d181941735" },
  { key: "PublicArt", value: "507c8c4091d498d9fc8c67a9" },
  { key: "Bar", value: "4bf58dd8d48988d116941735" },
  { key: "Hotel", value: "4bf58dd8d48988d1fa931735" },
  { key: "Office", value: "4bf58dd8d48988d124941735" },
  { key: "Library", value: "4bf58dd8d48988d12f941735" },
  { key: "Cultural Center", value: "52e81612bcbc57f1066b7a32" }
];

export const categoryName = categories.map(category => {
  return category.key;
});

export const categoryId = categories.map(category => {
  return category.value;
});

const versionDate = 20180606;

export const getFSvenues = mapCenter => {
  const urlRequest = `https://api.foursquare.com/v2/venues/search?ll=${
    mapCenter.lat
  },${
    mapCenter.lng
  }&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}&categoryId=${categoryId}&radius=1600&limit=50`;

  return fetch(urlRequest)
    .then(response => {
      return response.json();
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
      return response.json();
    })
    .then(data => {
      return data.response;
    });
};
