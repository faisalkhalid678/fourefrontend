import places from "../data/places.json";

function getPlace(id) {
    return places.filter(place => { return place.id === parseInt(id) })[0];

}
export { getPlace };