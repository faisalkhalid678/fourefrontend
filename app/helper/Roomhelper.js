import rooms from "../data/room.json";

function getRoom(id) {
    return rooms.filter(room => { return room.id === parseInt(id) })[0];

}
export { getRoom };