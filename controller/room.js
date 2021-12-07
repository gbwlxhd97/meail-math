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

export async function enterRoom(req,res) {
    const {title,name} = req.body;

    

    // 방입장할때마다 해당 방 인원 수 늘려주기.
    const room = await roomRepository.findRooms();
    let a = room.filter(item => item.title === title);
    a[0].participants = a[0].participants+1;
    // console.log(title,name);
}
