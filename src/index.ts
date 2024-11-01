import pdfRoutes from "@routes/pdf.route"
import "./config/env.config"

// src/index.ts
import express from "express"
// ROUTES

const app = express()

// Middleware
app.use(express.json())

// Routes

app.use("/api/pdf", pdfRoutes)

// Start the server
const PORT = process.env.PORT || "5800"
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
