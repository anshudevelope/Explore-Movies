require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDb");
const authRoutes = require("./routes/authRoutes.js")
const movieRoutes = require("./routes/movieRoutes.js")
const favoriteRoutes = require("./routes/favoriteRoutes.js")

const app = express();

// DB Connection
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // OPTIONAL but recommended


// api routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
