import SQ from "sequelize";
import {sequelize} from "../model/db.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;


export const Room = sequelize.define('room', {
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
        type: DataTypes.TEXT,
        allowNull: false
    },
    participants: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{timestamps:false})

export const DetailRoom = sequelize.define('detailRoom', {
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
DetailRoom.belongsTo(Room)
const INCLUDE_ROOM = {
    attributes: [
        'id'
    ],
    include: {
        model: DetailRoom,
        attributes: []
    }
}
export async function findRooms() { //생성된 모든 방 리스트 가져오기
    return Room.findAll();
}
export async function findRoom(id) { //방 하나 리스트 가져오기
    return Room.findOne({
        where:id
    }).then(data => data.dataValues)
}
export async function createRoom(data) {
    return Room.create({...data}).then((data => {
        return data.dataValues.id
    }))
}

export async function getById(id) {
    return Room.findOne({
        where: {id}
    })
}

export async function enterRoom(user) {

    // let b = Room.findOne({
    //     where: {
    //         id:user.roomId
    //     }
    // })
    // // return b;
    // Room.update(
    //     {participants: +10},
    //     {where: {
    //         id:user.roomId
    //     }}
    // )

    return DetailRoom.create({...user}).then((data => {
        // console.log(data);
        return data;
    }))
}

export async function exitRoom(id) {
    // console.log(id);
    return DetailRoom.findByPk(id.id)
    .then((data) => {
        data.destroy();
        return data.id
    })
}
