import * as timerRepository from "../data/timer.js"
import { Timer } from '../data/timer.js';
export async function getUserTime(req,res) { //특정인물의 모든 공부시간
    const {name} = req.body;
    const time = await timerRepository.getByName(name);
    if(!time) {
        return res.status(404).json({msesage: '해당유저는 아직 시간이없어.'})
    }
    res.status(200).json({...time});
}

export async function getAllRank(req,res) {
    const result = await timerRepository.getAllRank();
    res.status(201).json([...result])
}

export async function createStudyTime(req,res, next){
    const {time} = req.body;
    const userTime = await timerRepository.createStudyTime(req.userId)
    res.status(201).json({message: 'success'})
}

export async function updateStudyTime(req,res) {
    const id = req.userId;
    const time = req.body.time; //req 보낼값
    const data = await timerRepository.getById(id);
    let pk; //timer 테이블의 pk값
    pk=Timer.findOne({
        where: {
            userId:id
        }
    }).then(data => data.dataValues.id)
    if(!data) {
        return res.status(404).json({message: `time not found ${id}`})
    }
    if(data.userId !== req.userId) {
        return res.sendStatus(403);
    }
    const updated = await timerRepository.updateStudyTime(await pk,time)
    res.status(200).json(updated)
}