import { getSocketIO } from '../connection/socket.js';
import * as roomRepository from "../data/room.js";
import { Room } from '../data/room.js';
export async function findRooms(req,res) {
    const allRooms = await roomRepository.findRooms();
    console.log(allRooms);
    // console.log(allRooms.map(e => e.dataValues.participants));
    res.status(200).json([...allRooms])
}

export async function findRoom(req,res) {
    const id = req.params.id
    const Room = await roomRepository.findRoom({
        id
    });
    res.status(200).json({...Room})
}

export async function createRoom(req,res) {
    const {title,subject,info} = req.body;
    if(!title) {
        return res.status(402).json({message: '방제목을 입력하세요'})
    }
    if(!subject) {
        return res.status(402).json({message: '과목이름을 입력하세요'})
    }
    if(!info) {
        return res.status(402).json({message: '인포를입력해'})
    }
    const room = await roomRepository.createRoom({ //res 값은 방 id가 날라옴
        title,
        subject,
        info,
        // participants: {"thr": "ttt"} // 초기는 모두다 0
    });
    console.log(room);
    res.status(201).json({id: room})
    // getSocketIO().emit('rooms',room);
}
export async function enterRoom(req,res) {
    const {roomId,name,emoji} = req.body;
    // console.log(title,name);
    if(!roomId) {
        return res.status(402).json({message: '방번호를 입력하세요'})
    }
    if(!name) {
        return res.status(402).json({message: '닉네임을 입력해'})
    }
    const visit = await roomRepository.enterRoom({
        roomId,
        name,
        emoji
    });
    res.status(201).json(visit)
}

export async function exitRoom(req,res) {
    const {title,name,id} = req.body;
    if(!title) {
        return res.status(402).json({message: '방제목을 입력하세요'})
    }
    if(!name) {
        return res.status(402).json({message: '닉네임을 입력해'})
    }
    const leave = await roomRepository.exitRoom({
        title,
        name,
        id
    })
    res.status(203).json({message: '퇴장완료'})
}