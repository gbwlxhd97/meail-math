import express from "express";
import {} from'express-async-errors';
import * as roomController from "../controller/room.js";
import { isAuth } from '../middleware/auth.js';
const router =  express.Router();

router.get('/list', roomController.findRooms);
router.get('/detail/:id', roomController.findRoom);
router.post('/create',roomController.createRoom);
router.post('/enter',isAuth,roomController.enterRoom);
router.post('/exit',isAuth,roomController.exitRoom);
router.put('/timeUpdate',roomController.detailRoomTimeUpdate)
export default router;