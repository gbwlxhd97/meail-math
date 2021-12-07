import * as timerRepository from "../data/timer.js";

export async function getUserTime(req,res) { //특정인물의 모든 공부시간
    const {username} = req.body;
    const time = await timerRepository.findByTime(username);
    if(!time) {
        return res.status(402).json({msesage: '해당유저는 아직 시간이없어.'})
    }
    res.status(200).json({...time});
}

// export async function updateStudyTime(){
//     const {}
// }