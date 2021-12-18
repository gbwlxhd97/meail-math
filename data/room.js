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
        type: DataTypes.JSON,
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
        .catch(err => console.log(err))
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

export async function enterRoom(room) {

    console.log(room);
    let obj = {}
    obj = {
        "name":room.name,
        "emoji":room.emoji
    }
    let arr = []
    arr.push(obj)
    let particArr;
    particArr = Room.findOne({
        where: {
            id:room.roomId
        },
        attributes: ['participants']
    }).then(data =>data.dataValues.participants)
    if(await particArr===null) {
        Room.update(
            {participants: [...arr]},
            {where: {
                id:room.roomId
            }}
        )
    } else {
        Room.update(
            {participants: [...await particArr,...arr]},
            {where: {
                id:room.roomId
            }}
        )
    }
    return '아니에요'
}

export async function exitRoom(room) {
    // console.log(id);
    let particArr;
    let saveArr;
    particArr = Room.findOne({
        where: {
            id:room.roomId
        },
        attributes: ['participants']
    }).then(data =>data.dataValues.participants)
    saveArr = await particArr
    console.log(saveArr.length);
    // console.log(saveArr.filter(e => e.name !== room.name));
    Room.update(
        {participants: saveArr.filter(e => e.name !== room.name)},
        {where: {
            id:room.roomId
        }}
    )
    //참여자가 0명이면 자동방 닫힘
    if(saveArr.length === 1) {
        Room.destroy({
            where: {
                id:room.roomId
            }
        })
    }
}
