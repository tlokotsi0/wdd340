const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="/inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* **************************************
* Build the vehicle detail view HTML
* ************************************ */
Util.buildVehicleDetail = async function(data) {
  let display
  if (data) {
    display = '<div id="detail-display">'
    // Left Side: Image
    display += `<section id="detail-image">`
    display += `<img src="${data.inv_image}" alt="${data.inv_make} ${data.inv_model} on CSE Motors">`
    display += `</section>`
    
    // Right Side: Details
    display += `<section id="detail-info">`
    display += `<h2>${data.inv_make} ${data.inv_model} Details</h2>`
    display += `<div class="price-box">`
    display += `<span>Price: </span>`
    display += `<strong>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.inv_price)}</strong>`
    display += `</div>`
    display += `<p><strong>Description:</strong> ${data.inv_description}</p>`
    display += `<ul class="specs-list">`
    display += `<li><strong>Color:</strong> ${data.inv_color}</li>`
    display += `<li><strong>Mileage:</strong> ${data.inv_miles.toLocaleString()} miles</li>`
    display += `</ul>`
    display += `</section>`
    display += '</div>'
  } else {
    display = '<p class="notice">Sorry, that vehicle could not be found.</p>'
  }
  return display
}

/* ****************************************
 * Middleware to check token validity
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util