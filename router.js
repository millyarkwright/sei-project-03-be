import express from 'express'
import moviesController from './controllers/moviesController.js'
import userController from './controllers/userController.js'
import auth from './middleware/auth.js'

const router = express.Router()

// ! Health Check

router.route('/').get((req, res) => res.status(200).send('Api is running'))

// ! Movie Endpoints
router.route('/movies').get(auth, moviesController.getAll)
router.route('/movies/:movieId').get(moviesController.getSingle)


// ! User Endpoints
router.route('/users').get(userController.getAll)
router.route('/users/:userId')
  .get(userController.getSingle)
  .delete(userController.deleteProfile)
router.route('/register').post(userController.register)
router.route('/login').post(userController.login)


export default router