// 1234 : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTIzNA.C4wkSvr1L-R2PzQKGWGzgIjb3Zb8aft1inzGmJ6NqV8
let users = [
    {
        id:1,
        username: 'bob',
        password: "1234",
        name: 'bob'
    }
]

export async function findByUsername(username) {
    return users.find(user => user.username === username)
}

export async function findByName(username) {
    return users.find(user => {
        if(user.username === username) {
            return user.name
        }
    });
}

export async function findById(id) {
    return users.find(user => user.id === id)
}

export async function createUser(user) {
    const created = {...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
}
