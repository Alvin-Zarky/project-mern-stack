const express= require("express")
const router= express.Router()
const protectedRoute = require("../middleware/authMiddleware")
const {getTicket, getSingleTicket, createTicket, updateTicket, deleteTicket} = require("../controller/ticketController")

const noteRoute= require("./noteRoute")
router.use('/:id/note', noteRoute)
router.route('/').get(protectedRoute, getTicket).post(protectedRoute, createTicket)
router.route('/:id').get(protectedRoute, getSingleTicket).put(protectedRoute, updateTicket).delete(protectedRoute, deleteTicket)

module.exports = router