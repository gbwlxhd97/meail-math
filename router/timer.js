import express from "express";
import 'express-async-errors'
import * as timerController from "../controller/timer.js";

const router =  express.Router();




router.get('/allTime',timerController.getUserTime) //total,subject,focusTime

export default router;