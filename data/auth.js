// 1234 : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEyMzQifQ.PWaG6xN1AOjTKtDUbKiwXrtJKpHFw9_Cu3_8I_8HaYY.MTIzNA.C4wkSvr1L-R2PzQKGWGzgIjb3Zb8aft1inzGmJ6NqV8
let users = [
    {
        id:1,
        username: 'bob',
        password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTIzNA.C4wkSvr1L-R2PzQKGWGzgIjb3Zb8aft1inzGmJ6NqV8',
        name: 'bob',
        phoneNumber: '010-1234-1234',
        year: 2022
    }
]
import SQ from "sequelize";
import {sequelize} from "../model/db.js";
const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, //자동 증가 pk값
        allowNull: false, //null 허용 x
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    emoji: {
        type: DataTypes.STRING(191), //varChar 191
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },   
}, {timestamps:false})


export async function findByUsername(username) { //id중복체크
    return User.findOne({where: {username}})  
}

export async function findByName(username) { //로그인시 닉네임 반환
    return User.findOne({where: {username}}).then(data => data.dataValues.name);
}

export async function findByEmoji(username) { //로그인시 이모티콘 반환
    return User.findOne({where: {username}}).then(data => data.dataValues.emoji);
}

export async function findByName_SignUp(name) {
    return User.findOne({where: {name}}); //회원가입시 닉네임 중복 체크
}

export async function findById(id) {
    return User.findByPk(id)
}

export async function createUser(user) {
    return User.create(user).then(data => data.dataValues.id);
}

export async function findUsers() {
    return User.findAll({
        attributes: ['id','username','name','emoji']
    })
}
