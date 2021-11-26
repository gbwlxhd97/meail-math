import { Jwt } from 'jsonwebtoken';
import bcrypt from "bcrypt";
import express from "express";
import {} from "express-async-errors";

const jwtExpireInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req,res) {
    const {username,password,name} = req.body;
    // const found = await
}