import express from "express";
import {} from'express-async-errors';
import {body} from "express-validator";

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
]


export default router;