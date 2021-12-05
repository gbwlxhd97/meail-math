import { Server } from 'socket.io';
import jwt from "jsonwebtoken";
import { config } from '../config';

class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
            },
        });
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if(!token) {
                return next(new Error('Authenication Error'));
            }
            jwt.verify(token, config.jwt.secretKey, (error,decoded) => {
                if(error) {
                    return next(new Error('Authenication Error'));
                }
                next();
            });
        });
        this.io.on('connection', (socket) => {
            console.log('socket connection!');
        });
    }
}

let socket;
export function initSocket(server) {
    if(!socket) {
        socket = new Socket(server);
    }
}

export function getSocketIO() {
    if(!socket) {
        throw new Error('plz call init')
    }
    return socket.io;
}