let rooms = [
    {
        id: Date.now().toString(),
        title: "1번방",
        subject: "국어",
        info: "인포메이션",
        participants: 1
    }
]
import SQ from "sequelize";
import {sequelize} from "../model/db.js";
const DataTypes = SQ.DataTypes;

const Room = sequelize.define('room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, //자동 증가 pk값
        allowNull: false, //null 허용 x
        primaryKey: true
    },
    title : {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    info: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    participants: {
        type: DataTypes.INTEGER
    }
},{timestamps:false})

const DetailRoom = sequelize.define('detailRoom', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, //자동 증가 pk값
        allowNull: false, //null 허용 x
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(65),
        allowNull: false
    }
},{timestamps:false})

let room = [
    {title: '1번방', name: 'bob'}
]

export async function findRooms() {
    return Room.findAll()
}
export async function findRoom() {
    return room;
}
export async function createRoom(room) {
    return Room.create({...room}).then(data => data.dataValues.id)
    // const created = {id: Date.now().toString(),...room};
    // rooms.push(created);
    // return created.id
}

export async function enterRoom(user) {
    // console.log(DetailRoom.create({...user}));
    console.log(user);
    return DetailRoom
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
