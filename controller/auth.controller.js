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
    async registration(name, mail, hashPassword) {
        return await db.query(`INSERT INTO users(name, mail, password)  values($1, $2, $3) RETURNING *`, [name, mail, hashPassword]);
    }
}

module.exports = new AuthController();