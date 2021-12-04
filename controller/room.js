import * as roomRepository from "../data/room.js";

export async function findRooms(req,res) {
    const allRooms = await roomRepository.findRooms();
    res.status(200).json({...allRooms})
}

export async function createRoom(req,res) {
    const {title,subject,info} = req.body;
    const room = await roomRepository.createRoom({
        title,
        subject,
        info
    });
    res.status(201).json({room})
}