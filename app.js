import express from "express";
import 'express-async-errors'
import cors from "cors";
import morgan from 'morgan';
import helmet from 'helmet';
import AuthRouter from "./router/auth.js";
import TimerRouter from "./router/timer.js";
import RoomRouter from "./router/room.js";
import { config } from './config.js';
import { sequelize } from './model/db.js';
import * as roomController from "./controller/room.js";

const tasks = [
    { id: 1, title: '게시물 1번', content: '게시글 1번의 내용입니다.', createTime: new Date('2021-06-03').getTime() },
    { id: 2, title: '게시물 2번', content: '게시글 2번의 내용입니다.', createTime: new Date('2021-06-03').getTime() },
];

const app = express();
app.use(express.json()); // post data를 json처리해줘서 읽을 수 있음
app.use(helmet()); // 보안 header파일을 모두 사용하게해줌.
app.use(cors()); // import use만으로 cors 정책 허가 
app.use(morgan('tiny')); // req가 들어오면 log로 찍어서 남길 수 있음 인자 tiny는 format 형식임.

app.use('/auth' ,AuthRouter) //라우터처리.
app.use('/timer' ,TimerRouter) 
app.use('/room' ,RoomRouter) 
app.get('/api/tasks', (req, res) => res.status(200).json(tasks.sort((a, b) => b.createTime - a.createTime)));
app.use('/', (req,res,next) => {
    res.send('hi')
    // next();
})
app.use((req,res,next) => {
    res.sendStatus(404) 
});

app.use((error,req,res,next) => {
    console.error(error);
    res.sendStatus(500);
})
sequelize.sync().then(() => {
    // console.log(client);
})
app.listen(config.host.port);
