const Router = require('express');
const router = new Router();
const AuthController = require('../controller/auth.controller');
const {check} = require("express-validator");
const authMiddleware = require('../middlewaree/authMiddlewaree')

router.post('/registration',[
    check('name', 'Username did not empty').notEmpty(),
    check('mail', 'Mail did not empty').notEmpty(),
    check('password', 'Password must be have  min 4 max 10 symbols').isLength({min:4, max:10})
], AuthController.registration);
router.post('/login', AuthController.login);
router.get('/users', authMiddleware, AuthController.getUsers);

module.exports = router