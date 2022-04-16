const express= require("express")
const { registerUser, loginUser, profileUser }= require("../controller/userController")
const protectedRoute = require("../middleware/authMiddleware");
const router = express.Router()

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/profile', protectedRoute, profileUser)

module.exports= router