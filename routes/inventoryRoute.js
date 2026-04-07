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

// Route to display the edit inventory view
router.get(
  "/edit/:inv_id", 
  utilities.handleErrors(invController.editInventoryView)
);

// Process the update request
router.post(
  "/update",
  invValidate.inventoryRules(),
  invValidate.checkUpdateData, 
  utilities.handleErrors(invController.updateInventory)
);

// Delivery of the delete confirmation view
router.get("/delete/:inv_id", utilities.handleErrors(invController.buildDeleteView));

// Process the deletion
router.post("/delete", utilities.handleErrors(invController.deleteItem));


// Management view (Only for Employee/Admin)
router.get("/", 
  utilities.checkJWTToken, // 1. Verify identity
  utilities.checkAccountType, // 2. Verify permission
  utilities.handleErrors(invController.buildManagement)
)

// Add Classification (Only for Employee/Admin)
router.get("/add-classification", 
  utilities.checkJWTToken, 
  utilities.checkAccountType, 
  utilities.handleErrors(invController.buildAddClassification)
)

// Add Inventory (Only for Employee/Admin)
router.get("/add-inventory", 
  utilities.checkJWTToken, 
  utilities.checkAccountType, 
  utilities.handleErrors(invController.buildAddInventory)
)

// Update/Delete routes follow the same pattern...
router.get("/edit/:inv_id", 
  utilities.checkJWTToken, 
  utilities.checkAccountType, 
  utilities.handleErrors(invController.editInventoryView)
)


module.exports = router;