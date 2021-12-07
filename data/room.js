let rooms = [
    {
        id: Date.now().toString(),
        title: "1번방",
        subject: "국어",
        info: "인포메이션",
        participants: 1
    }
]

let room = [
    {title: '1번방', name: 'bob'}
]

export async function findRooms() {
    return rooms;
}
export async function findRoom() {
    return room;
}
export async function createRoom(room) {
    const created = {id: Date.now().toString(),...room};
    rooms.push(created);
    return created.id
}

export async function enterRoom(user) {
    const created = {...user};
    room.push(created);
    return created.title;
}

export async function exitRoom(user) {
    const exit = {...user};
    //임시로 이름으로함
    let index = room.findIndex(item => item.name === exit.name)
    room.splice(index,1);
    return `${exit.name}님이 퇴장하셨습니다.`
}
