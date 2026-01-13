const axios = require("axios");

exports.searchMovies = async (req, res) => {
    const { query, page = 1 } = req.query;

    try {
        if (!query) {
            return res.status(400).json({
                status: false,
                message: "Search query is required"
            });
        }

        const response = await axios.get(
            `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}&page=${page}`
        );

        return res.json(response.data);
    } catch (error) {
        console.error("Search Movies Error:", error.message);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch movies from OMDb API"
        });
    }
};

exports.getMovieDetails = async (req, res) => {
    const { imdbID } = req.params;

    try {
        if (!imdbID) {
            return res.status(400).json({
                status: false,
                message: "IMDB ID is required"
            });
        }

        const response = await axios.get(
            `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}`
        );

        return res.json(response.data);
    } catch (error) {
        console.error("Get Movie Details Error:", error.message);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch movie details from OMDb API"
        });
    }
};
