const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middlewaree/authMiddlewaree')

const getUsers = async (req, res) => {
    const users = await userController.getUsers();
    res.json(users.rows)
}

router.get('/users', authMiddleware, getUsers);
router.get('/user/:id',authMiddleware, userController.getUser);


module.exports = router