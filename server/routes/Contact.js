const express = require("express")
const router = express.Router()
const { contactUsController } = require("../cotrollers/ContactUs")

router.post("/contact", contactUsController)

module.exports = router