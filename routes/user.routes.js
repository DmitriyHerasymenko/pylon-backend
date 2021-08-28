const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middlewaree/authMiddlewaree')

router.post('/user', userController.createUser);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/user/:id', userController.getUser);
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);


module.exports = router