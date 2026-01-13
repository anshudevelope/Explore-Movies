const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware.js");

const {
    addFavorite,
    getFavorites,
    removeFavorite
} = require("../controllers/favoriteController.js");

router.use(protect);

router.post("/", addFavorite);
router.get("/", getFavorites);
router.delete("/:id", removeFavorite);

module.exports = router;
