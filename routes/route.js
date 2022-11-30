const express = require('express');
const router = express.Router();

const loginController = require('../controllers/auth/loginController');
const registerController = require('../controllers/auth/registerController');
const usersController = require('../controllers/users/usersController')
const user = require('../controllers/authorize')
const roomsController = require('../controllers/meetingRoom/roomController')

router.post('/api/auth/v1/register', registerController.register)
router.post('/api/auth/v1/login', loginController.login)

router.get('/api/admin/v1/users', user.isAuthorized, usersController.getAllUsers)
router.get('/api/admin/v1/users/:id', user.isAuthorized, usersController.findUser)
router.patch('/api/admin/v1/users/:id', user.isAuthorized, usersController.updateUser)
router.delete('/api/admin/v1/users/:id', user.isAuthorized, usersController.deleteUser)

router.get('/api/admin/v1/rooms', roomsController.getRooms)
router.post('/api/admin/v1/rooms', roomsController.createRoom)
router.patch('/api/admin/v1/rooms/:id', roomsController.updateRoom)
module.exports = router