const express = require('express');
const router = express.Router();

const loginController = require('../controllers/auth/loginController');
const registerController = require('../controllers/auth/registerController');
const usersController = require('../controllers/users/usersController')

router.post('/api/auth/v1/register', registerController.register)
router.post('/api/auth/v1/login', loginController.login)

router.get('/api/admin/v1/users', usersController.users)
router.get('/api/admin/v1/users/:id', usersController.findUser)
router.patch('/api/admin/v1/users/:id', usersController.updateUser)
router.delete('/api/admin/v1/users/:id', usersController.deleteUser)
module.exports = router