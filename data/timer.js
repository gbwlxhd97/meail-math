let times = [
    {
        id:1,
        username: 'bob',
        totalTime: '01:01:55', //HH:MM:SS
        foucsTime: '01:01:10',
        subjectTime: '03:30:30'
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

export async function updateTotalTime(id) {
    
}