import express from 'express'
import moviesController from './controllers/moviesController.js'
import userController from './controllers/userController.js'
import moviePreferenceController from './controllers/moviePreferenceController.js'
import auth from './middleware/auth.js'

const router = express.Router()

// ! Health Check

router.route('/').get((req, res) => res.status(200).send('Api is running'))

// ! Movie Endpoints
router.route('/movies').get(moviesController.getAll)
router.route('/movies/:movieId').get(moviesController.getSingle)


// ! User Endpoints
router.route('/users').get(userController.getAll)
router.route('/register').post(userController.register)
router.route('/login').post(userController.login)
router.route('/profile/:userId')
  .get(userController.getSingle)
  .delete(userController.deleteProfile)
// router.route('/profile/preferences/:userId')
//   .get(auth, moviePreferenceController.getAllPreferences)
// router.route('/profile/:userId').put(userController.updatedUserInfo)

// ! Movie Preference Endpoints
router.route('/profile/likes/:userId')
  .put(auth, moviePreferenceController.updateLikes)
router.route('/profile/dislikes/:userId')
  .put(auth, moviePreferenceController.updateDislikes)



export default router