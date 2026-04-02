// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId))

// Route to build the inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement));

//Route to deliver the "Add Classification" view
router.get("/addClassification", utilities.handleErrors(invController.buildAddClassification));

// Get inventory for AJAX communications
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
)

// Route to process the new classification data
router.post("/addClassification",
  invValidate.classificationRules(), 
  invValidate.checkId,               
  utilities.handleErrors(invController.addClassification) 
);

// GET the Add Inventory view
router.get("/addInventory", utilities.handleErrors(invController.buildAddInventory));

// POST the new vehicle
router.post(
  "/addInventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);

module.exports = router;