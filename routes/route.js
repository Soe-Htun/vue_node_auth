const express = require('express');
const router = express.Router();

const loginController = require('../controllers/auth/loginController');
const registerController = require('../controllers/auth/registerController');
const usersController = require('../controllers/users/usersController')
const user = require('../controllers/authorize')
const roomsController = require('../controllers/meetingRoom/roomController')
const meeetingsController = require('../controllers/meetings/meetingsController')

const { validate } = require('../validation/validation')

router.post('/api/auth/v1/register', registerController.register)
router.post('/api/auth/v1/login', validate(loginController.loginValidation), loginController.login)

router.post('/api/admin/v1/users', user.isAuthorized, usersController.createUser)
router.get('/api/admin/v1/users', user.isAuthorized, usersController.getAllUsers)
router.get('/api/admin/v1/users/:id', user.isAuthorized, usersController.findUser)
router.patch('/api/admin/v1/users/:id', user.isAuthorized, usersController.updateUser)
router.delete('/api/admin/v1/users/:id', user.isAuthorized, usersController.deleteUser)

router.get('/api/admin/v1/rooms', user.isAuthorized, roomsController.getRooms)
router.post('/api/admin/v1/rooms', user.isAuthorized, roomsController.createRoom)
router.patch('/api/admin/v1/rooms/:id', user.isAuthorized, roomsController.updateRoom)

router.post('/api/admin/v1/createMeety', meeetingsController.createMeeting)
router.get('/api/admin/v1/getAllMeety', meeetingsController.getAllMeetings)

module.exports = router