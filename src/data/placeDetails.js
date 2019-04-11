export const gatherContent = (marker, data) => {
  const locale = data.venue;

  const {
    description,
    name,
    location,
    bestPhoto,
    contact,
    canonicalUrl,
    categories
  } = locale;

  marker.name = name ? name : "Name not found";
  marker.url = canonicalUrl ? canonicalUrl : "Web address not found";
  marker.location = location.formattedAddress
    ? location.formattedAddress
    : "Address not found";
  marker.description = description ? description : "";
  marker.categories =
    categories.length > 0 ? categories[0].name : "Category not found";
  marker.phone = contact.phone ? contact.phone : "";
  marker.photo = bestPhoto
    ? `${bestPhoto.prefix}125x125${bestPhoto.suffix}`
    : "Images not found";

  return marker;
};

export const createInfowindow = marker => {
  marker.content = `<div class="infowindow">
                        <img class="place-img" src=${marker.photo}>
                        <div class='places-details'>
                            <h3 class="place-name">${marker.name}</h3>
                            <p class="place-address">${marker.location}</p>
                            <p class="place-phone">${marker.phone}</p>
                            <p class="place-description">${
                              marker.description
                            }</p>
                            <a id="website" href=${
                              marker.url
                            } target="_blank">${marker.url}</a>
                        </div>
                      </div>`;
};
