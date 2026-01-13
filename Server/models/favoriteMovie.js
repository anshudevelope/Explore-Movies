const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imdbID: String,
    title: String,
    poster: String,
    year: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
