const express= require("express")
const router= express.Router({mergeParams:true})
const protectedRoute = require("../middleware/authMiddleware");
const {getNote, postNote} = require("../controller/noteController")

router.route('/').get(protectedRoute, getNote).post(protectedRoute, postNote)

module.exports= router