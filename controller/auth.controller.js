const db = require('../db');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require("../config");

const generateAccessToken = id => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class AuthController {
    async registration(req, res) {
        try{
            const errors = validationResult(req);
             if(!errors.isEmpty()) {
                 return res.status(400).json({message: errors.errors[0].msg})
             }
            const {name, mail, password} = req.body;
            const users = await db.query(`SELECT * FROM person`);
            const checkName = users.rows.find(user => user.name === name);
            if(checkName) {
                return res.status(400).json({message: 'user name already exist'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = await db.query(`INSERT INTO person(name, mail, password)  values($1, $2, $3) RETURNING *`, [name, mail, hashPassword]);
            res.json(user.rows[0])

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try{
            const {name, mail, password} = req.body;
            const users = await db.query(`SELECT * FROM person`);
            const usersCheck = await db.query(`SELECT * FROM person WHERE name = ${name}`);
            const checkName = users.rows.find(user => user.name === name);
            if(!checkName) {
                return res.status(400).json({message: `User ${name} not found`})
            }
            const validPassword = bcrypt.compareSync(password, checkName.password);
            if(!validPassword)  {
                return res.status(400).json({message: 'error password'})
            }
            const token = generateAccessToken(checkName.id);
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try{
            const users = await db.query(`SELECT * FROM person`);
            return res.json(users.rows)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController();