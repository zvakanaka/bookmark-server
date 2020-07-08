const express = require('express')
const cors = require('cors')
const logger = require('./lib/logger')
const routes = require('./lib/routes')

require('dotenv').config()
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(logger)

app.use('/', routes)

app.listen(PORT, () => {
  console.log(new Date().toString())
  console.log(`Bookmark server listening at http://localhost:${PORT}`)
})
