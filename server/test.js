const express = require("express")
const mysql = require("mysql")
const config = require("./config/dev")
const connection = mysql.createConnection(config.dbConfig)

console.log(connection)
connection.query("SELECT * FROM API_ADM_INFO", (error, rows, fields) => {
  if (error) throw error
  console.log("User info is: ", rows)
})
connection.end()
