import * as timerRepository from "../data/timer.js"

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

export async function updateStudyTime(req,res, next){
    const {time} = req.body;
    const userTime = await timerRepository.updateTime(time, req.userId)
    res.status(201).json(userTime)
}