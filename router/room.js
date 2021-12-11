import express from "express";
import {} from'express-async-errors';
import * as roomController from "../controller/room.js";

const router =  express.Router();

router.get('/list', roomController.findRooms);
router.get('/detail/:id', roomController.findRoom);
router.post('/create',roomController.createRoom);
router.post('/enter',roomController.enterRoom);
router.post('/exit',roomController.exitRoom);
export default router;