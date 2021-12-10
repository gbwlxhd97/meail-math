import express from "express";
import 'express-async-errors'
import cors from "cors";
import morgan from 'morgan';
import helmet from 'helmet';
import AuthRouter from "./router/auth.js";
import TimerRouter from "./router/timer.js";
import RoomRouter from "./router/room.js";
import { config } from './config.js';

const app = express();
app.use(express.json()); // post data를 json처리해줘서 읽을 수 있음
app.use(helmet()); // 보안 header파일을 모두 사용하게해줌.
app.use(cors()); // import use만으로 cors 정책 허가 
app.use(morgan('tiny')); // req가 들어오면 log로 찍어서 남길 수 있음 인자 tiny는 format 형식임.

app.use('/auth' ,AuthRouter) //라우터처리.
app.use('/timer' ,TimerRouter) 
app.use('/room' ,RoomRouter) 

app.use((req,res,next) => {
    res.sendStatus(404) 
});

app.use((error,req,res,next) => {
    console.error(error);
    res.sendStatus(500);
})
sequelize.sync().then((client) => {
    // console.log(client);
})
app.listen(config.host.port);
