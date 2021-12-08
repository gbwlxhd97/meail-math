import * as roomRepository from "../data/room.js";

export async function findRooms(req,res) {
    const allRooms = await roomRepository.findRooms();
    res.status(200).json([...allRooms])
}

export async function findRoom(req,res) {
    const allRoom = await roomRepository.findRoom();
    res.status(200).json([...allRoom])
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
        info,
        participants: 0 //
    });
    res.status(201).json({room})
}

export async function enterRoom(req,res) {
    const {title,name} = req.body;
    if(!title) {
        return res.status(402).json({message: '방제목을 입력하세요'})
    }
    if(!name) {
        return res.status(402).json({message: '닉네임을 입력해'})
    }
    const visit = await roomRepository.enterRoom({
        title,
        name
    });
    res.status(201).json({message: 0})
    // 방입장할때마다 해당 방 인원 수 늘려주기. 중복제거 아직안함.
    const room = await roomRepository.findRooms();
    let selectRoom = room.filter(item => item.title === title);
    selectRoom[0].participants = selectRoom[0].participants+1;
}

export async function exitRoom(req,res) {
    const {title,name} = req.body;
    if(!title) {
        return res.status(402).json({message: '방제목을 입력하세요'})
    }
    if(!name) {
        return res.status(402).json({message: '닉네임을 입력해'})
    }
    const leave = await roomRepository.exitRoom({
        title,
        name
    })
    res.status(203).json({message: 'success'})
    const room = await roomRepository.findRooms();
    let selectRoom = room.filter(item => item.title === title);
    selectRoom[0].participants = selectRoom[0].participants-1;
}