let rooms = [
    {
        id: Date.now().toString(),
        title: "1번방",
        subject: "국어",
        info: "인포메이션",
        participants: 0
    }
]

let room = [
    {title: '1번방', name: 'bob'}
]

export async function findRooms() {
    return rooms;
}

export async function createRoom(room) {
    const created = {id: Date.now().toString(),...room};
    rooms.push(created);
    return created.id
}

export async function enterRoom(name) {
    const created = {...name};
    room.push(created);
    return created.title;
}
