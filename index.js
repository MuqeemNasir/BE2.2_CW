const {initializeDatabase}  = require('./db/db.connect')
const Movie = require('./models/moves.models')

initializeDatabase()

const newMovie = {
    title: "New Movie",
    releaseYear: 2023,
    genre: ["Drama"],
    director: "Aditya Roy Chopra",
    actors: ["Actor1", "Actor2"],
    language: "Hindi",
    country: "India",
    rating: 6.1,
    plot: "A young man and woman fall in love on a Austria trip.",
    awards: "IIFA Filmfare Awards",
    posterUrl: "https://example.com/new-poster1.jpg",
    trailerUrl: "https://example.com/new-trailer1.mp4",
}

async function createMovie(newMovie) {
    try{
        const movie = new Movie(newMovie)
        const saveMovie = await movie.save()
        console.log("New Movie Data.", saveMovie)
    }catch (error){
        throw error
    }
}

// createMovie(newMovie)

// find a movie with a particular title

async function readMovieByTitle(movieTitle) {
    try{
        const movie = await Movie.findOne({title: movieTitle})
        console.log(movie)
    }catch (error){
        throw error
    }
}

// readMovieByTitle("Dilwale Dulhania Le Jayenge")
// readMovieByTitle("Lagaan")

// to get all the movies in the database

async function readAllMovies(){
    try{
        const allMovies = await Movie.find()
        console.log(allMovies)
    }catch(error){
        console.log(error)
    }
}

// readAllMovies()

// get movie by director name

async function readMovieByDirector(directorName){
    try{
        const movieByDirector = await Movie.find({director: directorName})
        console.log(movieByDirector)
    }catch(error){
        console.log(error)
    }
}

// readMovieByDirector("Kabir Khan")

// find movie by id and update it's rating and release year

async function updateMovie(movieId, dataToUpdate) {
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true})
        console.log(updatedMovie)
    }catch(error){
        console.log("Error in updating Movie rating", error)
    }
}

// updateMovie("68a5c66ca53a3ea39a5c0163", {rating: 8.0})
// updateMovie("68a5c66ca53a3ea39a5c0163", {releaseYear: 2002})

// find one data and update its value

async function updateMovieDetail(movieTitle, dataToUpdate) {
    try{
        const updatedMovie = await Movie.findOneAndUpdate({title: movieTitle}, dataToUpdate, {new: true})
        console.log(updatedMovie)
    }catch(error){
        console.log("Error in changing data: ", error)
    } 
}

updateMovieDetail("Kabhi Khushi Kabhie Gham", {releaseYear: 2001})