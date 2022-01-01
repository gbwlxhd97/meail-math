import SQ from "sequelize";
import { sequelize } from '../model/db.js';
import { User } from './auth.js';
import * as UserRepository from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Timer = sequelize.define('timer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});
Timer.belongsTo(User);

const INCLUDE_USER = {
    attributes: [
        'id','time','userId',
        [Sequelize.col('user.name'),'name'],
        [Sequelize.col('user.username'),'username'], //나중에 없애기
        [Sequelize.col('user.emoji'),'emoji'],
    ],
    include: {
        model: User,
        attributes: []
    },
}

const ORDER_TIME_RANK = {
    order: [['time', 'DESC']] //시간랭킹순
}

export async function findByTime(username) {
    return times.find(time => {
        if(time.username === username) {
            return [{
                totalTime: time.totalTime,
                focustTime : time.foucsTime,
                subjectTime: time.subjectTime
            }]
        } 
    });
}

export async function getAllRank() {
    return Timer.findAll({...INCLUDE_USER,...ORDER_TIME_RANK})
}

export async function getByName(id) {
    return Timer.findOne({
        where:{id},
        ...INCLUDE_USER
    })
}

export async function getById(id) {
    return Timer.findOne({
        where:{
            userId:id
        },
        ...INCLUDE_USER
    })
}

export async function createStudyTime(userId) {
    return Timer.create({userId})
    // .then(data => getById(data.dataValues.id))
}

export async function updateStudyTime(pk,time) {
    return Timer.findByPk(pk,INCLUDE_USER)
    .then((data) => {
        data.time = time;
        return data.save(); //저장하면 바뀐 자기자신 리턴
    })
}

export async function remove(id) {
    return Timer.findByPk(id)
    .then((data) => {
        data.destroy();
    })
}


export async function testUpdateTime() {
    
}