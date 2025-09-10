const express = require('express')
const cors = require('cors')
const app = express()

const { initializeDatabase } = require('./db/db.connect')
const Movie = require('./models/moves.models')

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json())

initializeDatabase()

async function createMovie(newMovie) {
    try {
        const movie = new Movie(newMovie)
        const saveMovie = await movie.save()
        // console.log("New Movie Data.", saveMovie)
        return saveMovie
    } catch (error) {
        throw error
    }
}

app.post("/movies", async (req, res) => {
    try {
        const savedMovie = await createMovie(req.body)
        res.status(201).json({ message: "Movie added successfully.", movie: savedMovie })
    } catch (error) {
        res.status(500).json({ error: "Failed to add movie." })
    }
})


// find a movie with a particular title

async function readMovieByTitle(movieTitle) {
    try {
        const movie = await Movie.findOne({ title: movieTitle })
        return movie
    } catch (error) {
        throw error
    }
}

app.get("/movies/:title", async (req, res) => {
    try {
        const movie = await readMovieByTitle(req.params.title)
        if (movie) {
            res.json(movie)
        } else {
            res.status(404).json({ error: "Movie not found." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie." })
    }
})

// to get all the movies in the database

async function readAllMovies() {
    try {
        const allMovies = await Movie.find()
        return allMovies
    } catch (error) {
        console.log(error)
    }
}

app.get("/movies", async (req, res) => {
    try {
        const movies = await readAllMovies()
        if (movies.length !== 0) {
            res.json(movies)
        } else {
            res.status(404).json({ error: "No movies found." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies." })
    }
})

// get movie by director name

async function readMovieByDirector(directorName) {
    try {
        const movieByDirector = await Movie.find({ director: directorName })
        return movieByDirector
    } catch (error) {
        console.log(error)
    }
}

app.get("/movies/director/:directorName", async (req, res) => {
    try {
        const movies = await readMovieByDirector(req.params.directorName)
        if (movies.length != 0) {
            res.json(movies)
        } else {
            res.status(404).json({ error: "No movies found." })
        }
    } catch (error) {
        res.status(500).json({ error: "failed to fetch movies." })
    }
})

async function readMovieByGenre(genreName) {
    try {
        const movieByGenre = await Movie.find({ genre: genreName })
        return movieByGenre
    } catch (error) {
        console.log(error)
    }
}

app.get("/movies/genres/:genreName", async (req, res) => {
    try {
        const movies = await readMovieByGenre(req.params.genreName)
        if (movies.length != 0) {
            res.json(movies)
        } else {
            res.status(404).json({ error: "Movies not found." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies." })
    }
})

// find movie by id and update it's rating and release year

async function updateMovie(movieId, dataToUpdate) {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, { new: true })
        // console.log(updatedMovie)
        return updatedMovie
    } catch (error) {
        console.log("Error in updating Movie rating", error)
    }
}

app.post("/movies/:movieId", async (req, res) => {
    try {
        const updatedMovie = await updateMovie(req.params.movieId, req.body)
        if (updatedMovie) {
            res.status(200).json({ message: "Movie updated successfully.", updatedMovie: updatedMovie })
        } else {
            res.status(404).json({ error: "Movie not found by Movie id." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update movie." })
    }
})

// updateMovie("68a5c66ca53a3ea39a5c0163", {rating: 8.0})
// updateMovie("68a5c66ca53a3ea39a5c0163", {releaseYear: 2002})

// find one data and update its value

async function updateMovieDetail(movieTitle, dataToUpdate) {
    try {
        const updatedMovie = await Movie.findOneAndUpdate({ title: movieTitle }, dataToUpdate, { new: true })
        console.log(updatedMovie)
    } catch (error) {
        console.log("Error in changing data: ", error)
    }
}

// updateMovieDetail("Kabhi Khushi Kabhie Gham", {releaseYear: 2001})

// BE2.4_CW

// find a movie by id and delete from the database

async function deleteMovie(movieId) {
    try {
        const deleteMovie = await Movie.findByIdAndDelete(movieId)
        // console.log(deleteMovie )
        return deleteMovie
    } catch (error) {
        console.log("Error in Deleting Movie", error)
    }
}

app.delete("/movies/:movieId", async (req, res) => {
    try {
        const deletedMovie = await deleteMovie(req.params.movieId)
        if (deletedMovie) {
            res.status(200).json({ message: "Movie deleted successfully." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete movie." })
    }
})

// deleteMovie("68a77076dcf3758d827c3faa")

async function deleteMovieFromDb(movieTitle) {
    try {
        const deletedMovie = await Movie.findOneAndDelete({ title: movieTitle })
        console.log("This movie was deleted: ", deletedMovie)
    } catch (error) {
        console.log("Error in movie deletion", error)
    }
}

// deleteMovieFromDb("3 Idiots")

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})