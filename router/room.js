import express from "express";
import {} from'express-async-errors';
import * as roomController from "../controller/room.js";

const router =  express.Router();

router.get('/list', roomController.findRooms);
router.post('/create',roomController.createRoom);

export default router;