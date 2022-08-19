import MovieModel from '../models/movies.js'
import UserModel from '../models/users.js'

// ! Create Preferences

const updatePreferences = async (req, res, next) => {
  const { userId, movieId } = req.params
  const newPreference = req.body

  console.log('user->', userId)
  console.log('movieId->', movieId)
  console.log('preferences->', newPreference)

  try {
    const movie = await MovieModel.findById(movieId)
    const user = await UserModel.findById(userId)
    const { moviePreference } = user
    const { moviesLiked, moviesDisliked } = user.moviePreferences[0]

    
    console.log('current movies liked', moviesLiked)

    moviesLiked.push(movieId)


    await user.save()

    return res.status(200).json({ message: 'Preference successfully created', moviePreferences: newPreference })

  } catch (error) {
    next(error)
  }
  // use Map function for update
}



export default {
  updatePreferences,
}