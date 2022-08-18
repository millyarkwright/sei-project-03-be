import MovieModel from '../models/movies.js'

// ! Get all movies 

// const getAll = async (req, res) => {
//   const allMovies = await MovieModel.find()
//   console.log('allmovies->', allMovies)
//   return res.status(200).json(allMovies)
// }

// const getSingle = async (req, res) => {
//   const singleMovie = 
// }

const getAll = async (req, res, next) => {
  console.log('reaching line 16')
  const allMovies = await MovieModel.find()
  console.log('reached line 18')
  return res.status(200).json(allMovies)
}

export default {
  getAll,
}