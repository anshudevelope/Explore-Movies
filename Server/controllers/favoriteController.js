const Favorite = require("../models/favoriteMovie.js");

exports.addFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.create({
            user: req.user._id,
            ...req.body
        });

        return res.status(201).json({
            success: true,
            data: favorite
        });
    } catch (error) {
        console.error("Failed to add favorites:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add movie to favorites"
        });
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user._id });

        return res.json({
            success: true,
            data: favorites
        });
    } catch (error) {
        console.error("Failed to fetch data:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch favorites"
        });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findByIdAndDelete(req.params.id);

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found"
            });
        }

        return res.json({
            success: true,
            message: "Removed from favorites"
        });
    } catch (error) {
        console.error("Remove Favorite Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove favorite"
        });
    }
};
