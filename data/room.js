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

// export const DetailRoom = sequelize.define('detailRoom', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true, //자동 증가 pk값
//         allowNull: false, //null 허용 x
//         primaryKey: true
//     },
//     title: {
//         type: DataTypes.STRING(65),
//         allowNull: false
//     },
//     name: {
//         type: DataTypes.STRING(65),
//         allowNull: false
//     }
// },{timestamps:false})
// DetailRoom.belongsTo(Room)
// const INCLUDE_ROOM = {
//     attributes: [
//         'id'
//     ],
//     include: {
//         model: DetailRoom,
//         attributes: []
//     }
// }
export async function findRooms() { //생성된 모든 방 리스트 가져오기
    return Room.findAll({
        attributes: [
            'id','title','subject','participants'
        ]
    });
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
        "emoji":room.emoji,
        "time": 0
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
}
export async function detailRoomTimeUpdate(room) {
    let particArr;
    let restArr; 
    let updateArr;
    particArr = Room.findOne({
        where: {
            id:room.roomId
        },
        attributes: ['participants']
    }).then(data =>data.dataValues.participants)
    updateArr = [...await particArr]
    restArr = [...await particArr]
    restArr = restArr.filter(item => item.name !== room.name) //나머지 학생들
    updateArr = updateArr.filter(item => item.name === room.name) //바꿀 학생
    let saveEmoji = updateArr[0].emoji
    let obj = {}
    obj = {
        "name":room.name,
        "time": room.time,
        "emoji": saveEmoji
    }
    updateArr = []
    updateArr.push(obj)

    return Room.update(
        {participants: [...restArr,...updateArr]},
        {where: {
            id:room.roomId
        }}
    )
    console.log(updateArr);
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
