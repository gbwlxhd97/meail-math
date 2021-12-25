import { getSocketIO } from '../connection/socket.js';
import * as roomRepository from "../data/room.js";
import * as userRepository from '../data/auth.js';
import { Room } from '../data/room.js';

export async function findRooms(req,res) {
    const allRooms = await roomRepository.findRooms();
    console.log(allRooms);
    // console.log(allRooms.map(e => e.dataValues.participants));
    res.status(200).json([...allRooms])
}

export async function findRoom(req,res) {
    const id = req.params.id
    const room = await roomRepository.findRoom({
        id
    });
    
    if(room !== undefined) {
        res.status(200).json({...room})
    } else {
        res.status(404).json({message: `${id}번 방은 없습니다. 다시조회해주세요`})
    }
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
    const foundData = await roomRepository.findRoom(roomId)
    let found;
    let roomIdDatas = []
    let roomIds = []
    let check
    roomIdDatas =Room.findAll({ //현재 존재하는 방의 번호들을 담은 원본배열
        attributes: ['id']
    }).then(data => data.map(e => e.dataValues.id))
    roomIds = [...await roomIdDatas]
    check = roomIds.includes(roomId);
    if(!check) {
        return res.status(404).json({message: '해당하는 방 번호는 없어'})
    }
    if(foundData.participants !==null) { //초기 널 체크
        found =foundData.participants.filter(user => user.name ===name).length //이름이 공통인애들만 찾는 배열 1이상이면 공통인놈이 이미 있는거임
    }
    if(found>=1) {
        return res.status(409).json({message: `${roomId}번방 안에 ${name}님은 이미 입장해 있습니다.`})
    }
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
    console.log(visit);
    res.status(201).json({message: `${name}님 ${roomId}번방입장`})
}

export async function exitRoom(req,res) {
    const {roomId,name} = req.body;
    if(!roomId) {
        return res.status(402).json({message: '방번호를 입력하세요.'})
    }
    if(!name) {
        return res.status(402).json({message: '닉네임을 입력해'})
    }
    const leave = await roomRepository.exitRoom({
        roomId,
        name
    })
    try {
        res.status(203).json({message: `${name}님 ${roomId}번방퇴장`})
    } catch (error) {
        res.status(404).json({message: `${roomId}번은 생성된 방이 아닙니다.`})
    }

}