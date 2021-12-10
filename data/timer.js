let times = [
    {
        id:1,
        username: 'bob',
        totalTime: 3600, //HH:MM:SS
        foucsTime: 360,
        subjectTime: 100
    }
]

export async function findByTime(username) {
    return times.find(time => {
        if(time.username === username) {
            return [{
                totalTime: time.totalTime,
                focustTime : time.foucsTime,
                subjectTime: time.subjectTime
            }]
        } 
    });
}

export async function startStudy(id) {
    
}