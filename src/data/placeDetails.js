export const gatherContent = (marker, data) => {
  const locale = data.venue;

  const {
    canonicalUrl,
    description,
    location,
    name,
    bestPhoto,
    contact,
    categories
  } = locale;

  marker.url = canonicalUrl ? canonicalUrl : "Web address not found";
  marker.description = description ? description : "";
  marker.name = name ? name : "Name not found";
  marker.location = location.formattedAddress
    ? location.formattedAddress
    : "Address not found";
  marker.categories =
    categories.length > 0 ? categories[0].name : "Category not found";
  marker.phone = contact.phone ? contact.phone : "";
  marker.photo = bestPhoto
    ? `${bestPhoto.prefix}125x125${bestPhoto.suffix}`
    : "Images not found";

  return marker;
};

export const createInfoWindow = marker => {
  marker.content = `<div class="infowWindow">
                        <img src=${marker.photo}>
                        <div class='places-details'>
                            <h3>${marker.name}</h3>
                            <p>${marker.location}</p>
                            <p>${marker.phone}</p>
                            <p>${marker.description}</p>
                            <a href=${marker.url} target="_blank">${
    marker.url
  }</a>
                        </div>
                      </div>`;
};
