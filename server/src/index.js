const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const bookRoutes = require("./routes/books")

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
)
app.use(express.json())

// Only Books API (no auth needed)
app.use("/api/books", bookRoutes)

app.get("/api/health", (req, res) => {
  res.json({ message: "BookFinder API is running!" })
})

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bookfinder")
  .then(() => {
    console.log("✅ Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  })

module.exports = app
