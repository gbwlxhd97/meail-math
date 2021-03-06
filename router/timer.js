import express from "express";
import 'express-async-errors'
import * as timerController from "../controller/timer.js";
import { isAuth } from '../middleware/auth.js';
const router =  express.Router();



router.get('/ranking',timerController.getAllRank)
router.get('/allTime',timerController.getUserTime) //total,subject,focusTime
router.post('/createTime',isAuth,timerController.createStudyTime)
router.put('/updateTime',isAuth,timerController.updateStudyTime);
export default router;