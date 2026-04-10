const pool = require("../database/")

/* Save a new inquiry */
async function sendInquiry(inquiry_subject, inquiry_message, inv_id, account_id) {
  try {
    const sql = "INSERT INTO inquiry (inquiry_subject, inquiry_message, inv_id, account_id) VALUES ($1, $2, $3, $4) RETURNING *"
    return await pool.query(sql, [inquiry_subject, inquiry_message, inv_id, account_id])
  } catch (error) {
    return error.message
  }
}

async function getInquiriesByAccountId(account_id) {
  try {
    const sql = `
      SELECT i.*, inv.inv_make, inv.inv_model 
      FROM inquiry i 
      JOIN inventory inv ON i.inv_id = inv.inv_id 
      WHERE i.account_id = $1 
      ORDER BY i.inquiry_date DESC`
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    return new Error("Error fetching inquiries")
  }
}

/* Get ALL inquiries for administrative staff */
async function getAllInquiries() {
  const sql = `SELECT i.*, inv.inv_make, inv.inv_model, a.account_firstname, a.account_lastname, a.account_email 
               FROM inquiry i 
               JOIN inventory inv ON i.inv_id = inv.inv_id 
               JOIN account a ON i.account_id = a.account_id 
               ORDER BY inquiry_date DESC`
  const data = await pool.query(sql)
  return data.rows
}

module.exports = {
    sendInquiry,
    getInquiriesByAccountId,
    getAllInquiries
};