import pdfRoutes from "@routes/pdf.route"
import "./config/env.config"

import express from "express"
const app = express()

app.use(express.json())

// Routes
app.use("/api/pdf", pdfRoutes)

// Start the server
const PORT = process.env.PORT || "5800"
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
