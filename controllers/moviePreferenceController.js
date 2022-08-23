import MovieModel from '../models/movies.js'
import UserModel from '../models/users.js'
import mongoose from 'mongoose'

// ! Create Preferences

const updateLikes = async (req, res, next) => {
  const { movieId } = req.params
  const { id: currentUserId } = req.currentUser

  console.log('currentUserId->', currentUserId)
  // console.log('movieId->', movieId)

  try {
    const user = await UserModel.findById(currentUserId)
    user.moviesLiked.push(movieId)
    await user.save()
    return res.status(200).json({ message: 'Preference successfully updated' })
  } catch (error) {
    next(error)
  }
}

const updateDislikes = async (req, res, next) => {
  const { movieId } = req.params
  const { id: currentUserId } = req.currentUser

  console.log('currentUserId->', currentUserId)
  // console.log('movieId->', movieId)

  try {
    const user = await UserModel.findById(currentUserId)
    user.moviesDisliked.push(movieId)
    await user.save()
    return res.status(200).json({ message: 'Preference successfully updated' })
  } catch (error) {
    next(error)
  }
}



const updateMoviePreferences = async (req, res, next) => {
  const { id: currentUserId } = req.currentUser
  const { body: preferences } = req
  console.log('mov pref req body->', preferences)

  console.log('currentUserId->', currentUserId)
  // console.log('movieId->', movieId)
  const likedId = mongoose.Types.ObjectId(preferences.moviesLiked)
  const dislikedId = mongoose.Types.ObjectId(preferences.moviesDisliked)

  const newPreferences = { ...preferences, moviesLikes: likedId, moviesDisliked: dislikedId }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(currentUserId, newPreferences, { new: true })

    console.log('updateduser->', updatedUser)

    return res.status(200).json({ message: 'Preference successfully updated' })
  } catch (error) {
    next(error)
  }
}


const getAllPreferences = async (req, res, next) => {
  const { id: currentUserId } = req.currentUser
  try {
    const user = await UserModel.findById(currentUserId)
    const { moviesLiked, moviesDisliked } = user
    console.log('moviesliked->', moviesLiked)
    return res.status(200).json({ moviesLiked: `${moviesLiked}`, moviesDisliked: `${moviesDisliked}` })
  } catch (error) {
    next(error)
  }
}

export default {
  updateLikes,
  updateDislikes,
  updateMoviePreferences,
  getAllPreferences,
}