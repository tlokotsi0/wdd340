const inqModel = require("../models/inquiry-model")
const utilities = require("../utilities/")

const inqCont = {}

inqCont.processInquiry = async function (req, res) {
  const { inquiry_subject, inquiry_message, inv_id, account_id } = req.body
  const result = await inqModel.sendInquiry(inquiry_subject, inquiry_message, inv_id, account_id)

  if (result) {
    req.flash("notice", "Your inquiry has been sent! A representative will contact you shortly.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, your message could not be sent.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

inqCont.buildArchivedInquiries = async function (req, res) {
  let nav = await utilities.getNav()
  const allInquiries = await inqModel.getAllInquiries()
  
  res.render("account/admin-inquiries", {
    title: "Customer Inquiries Management",
    nav,
    errors: null,
    allInquiries,
  })
}

module.exports = inqCont