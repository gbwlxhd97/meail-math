import  jwt  from 'jsonwebtoken';
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/auth.js";
import { config } from '../config.js';


export async function signup(req,res) {
    const {username,password,name,phoneNumber,emoji,year} = req.body;
    const found = await userRepository.findByUsername(username);
    const nameFound = await userRepository.findByName_SignUp(name);
    if(found) {
        return res.status(409).json({message: `${username}은 이미 존재하는 id입니다.`})
    }
    if(nameFound) {
        return res.status(409).json({message: `${name}은 이미 존재하는 닉네임 입니다.`})
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        phoneNumber,
        emoji,
        year
    });
    const token = createJwtToken(userId);
    res.status(201).json({token, username})
}

export async function login(req,res) {
    const {username,password} = req.body;
    const user = await userRepository.findByUsername(username);
    const name = await userRepository.findByName(username);
    const emoji = await userRepository.findByEmoji(username);
    console.log(name);
    if(!user) {
        return res.status(401).json({message: '아이디 또는 비밀번호가 유효하지않습니다.'})
    }
    const isvalidPassword = await bcrypt.compare(password, user.password); //db pw와 사용자가 입력한 pw를 비교
    if(!isvalidPassword) {
        return res.status(401).json({message : '아이디 또는 비밀번호가 유효하지않습니다.'})
    }
    const token = createJwtToken(user.id)
    res.status(200).json({token,name,emoji});
}

function createJwtToken(id) {
    return jwt.sign({id}, 
        config.jwt.secretKey, {
            expiresIn: config.jwt.expiresInSec,
    });
}

export async function me(req,res,next) {
    const user = await userRepository.findById(req.userId);
    if(!user) {
        return res.status(404).json({message: 'User not found'})
    }
    res.status(200).json({token: req.token, username: user.username})
}

export async function findUsers(req,res) {
    const allUsers = await userRepository.findUsers();
    console.log(allUsers); 
    res.status(200).json([...allUsers])
}

export async function checkId(req,res) {
    const {username} = req.body;
    const found = await userRepository.findByUsername(username);
    if(found) {
        return res.status(209).json({message: true})
    } else {
        return res.status(208).json({message: false})
    }
}
