//needed sources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")

// Route to build login view
// The "account" portion of the path is handled in server.js
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post("/register", utilities.handleErrors(accountController.registerAccount))

module.exports = router;
