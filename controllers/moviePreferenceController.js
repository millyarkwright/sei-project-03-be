import MovieModel from '../models/movies.js'
import UserModel from '../models/users.js'

// ! Create Preferences

const createPreference = async (req, res, next) => {
  const { userId, movieId } = req.params
  const { body: preferences } = req

  console.log('user->', userId)
  console.log('movieId->', movieId)
  console.log('preferences->', preferences)

  try {
    const movie = await MovieModel.findById(movieId)
    const user = await UserModel.findById(userId)

   
    user.moviePreferences.push(preferences)

    console.log('user updated->', user)

    await user.save()

    return res.status(200).json({ message: 'Preference successfully created', moviePreferences: preferences })

  } catch (error) {
    next(error)
  }
  // use Map function for update
}



export default {
  createPreference,
}