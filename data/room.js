let rooms = [
    {
        id: Date.now().toString(),
        title: "1번방",
        subject: "국어",
        info: "인포메이션"
    }
]

export async function findRooms() {
    return rooms;
}

export async function createRoom(room) {
    const created = {id: Date.now().toString(),...room};
    rooms.push(created);
    return created.id
}

export async function enterRoom(username) {

}
