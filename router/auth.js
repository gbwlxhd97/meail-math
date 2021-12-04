import express from "express";
import {} from'express-async-errors';
import {body} from "express-validator";
import { isAuth } from '../middleware/auth.js';
import * as authController from "../controller/auth.js"
const router =  express.Router();

const validateCredentail = [
    body('username')
    .trim()
    .notEmpty()
    .withMessage('id는 최소 2글자 이상'),
    body('password')
    .trim()
    .isLength({min: 2})
    .withMessage('비밀번호는 최소 5글자 이상')
];

const validateSignup = [
    ...validateCredentail,
    body('name').notEmpty().withMessage('name is missing'),
    
];
router.post('/signup', validateSignup,authController.signup);
router.post('/login', validateCredentail,authController.login);
router.post('/checkId',authController.checkId)
router.get('/me', isAuth, authController.me);
router.get('/users',authController.findUsers)
export default router;