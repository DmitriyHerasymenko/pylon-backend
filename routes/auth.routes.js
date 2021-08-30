const Router = require('express');
const router = new Router();
const AuthController = require('../controller/auth.controller');
const UserController = require('../controller/user.controller')
const bcrypt = require('bcryptjs');
const {check, validationResult} = require("express-validator");
const authMiddleware = require('../middlewaree/authMiddlewaree');
const jwt = require('jsonwebtoken');
const {secret} = require("../config");

const generateAccessToken = id => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
};

const registration = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.errors[0].msg})
        }
        const {name, mail, password} = req.body;
        const users = await UserController.getUsers();
        const checkName = users.rows.find(user => user.name === name);
        if(checkName) {
            return res.status(400).json({message: 'user name already exist'})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const newUser = await AuthController.registration(name, mail, hashPassword);
        res.json(newUser.rows[0])
    }
    catch (e) {
        console.log(e)
        res.status(400).json({message: 'Registration error'})
    }

};
const login = async (req, res) => {
    try{
        const {name, mail, password} = req.body;
        const users = await UserController.getUsers();
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
    }
    catch (e) {
        console.log(e)
        res.status(400).json({message: 'Login error'})
    }
};

router.post('/register',[
    check('name', 'Username did not empty').notEmpty(),
    check('mail', 'Mail did not empty').notEmpty(),
    check('password', 'Password must be have  min 4 max 10 symbols').isLength({min:4, max:10})
], registration);
router.post('/login', login);

module.exports = router