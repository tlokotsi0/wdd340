const express = require("express")
const router = new express.Router()
const inqCont = require("../controllers/inquiryController")
const utilities = require("../utilities/")

// Route to process the inquiry submission
// We use checkJWTToken to ensure only logged-in users can POST
router.post(
  "/send",
  utilities.checkJWTToken,
  utilities.handleErrors(inqCont.processInquiry)
)

// Staff only route to see all inquiries
router.get(
  "/manage",
  utilities.checkJWTToken,
  utilities.checkAccountType, 
  utilities.handleErrors(inqCont.buildArchivedInquiries)
)

module.exports = router