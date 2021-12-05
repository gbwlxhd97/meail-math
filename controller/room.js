import * as roomRepository from "../data/room.js";

export async function findRooms(req,res) {
    const allRooms = await roomRepository.findRooms();
    res.status(200).json({...allRooms})
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
    const room = await roomRepository.createRoom({
        title,
        subject,
        info
    });
    
    res.status(201).json({room})
}