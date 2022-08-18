import express from 'express'
import moviesController from './controllers/moviesController.js'
import userController from './controllers/userController.js'

const router = express.Router()

// ! Health Check

router.route('/').get((req, res) => res.status(200).send('Api is running'))

// ! Movie Endpoints
router.route('/movies').get(moviesController.getAll)
router.route('/movies/:movieId').get(moviesController.getSingle)


// ! User Endpoints
router.route('/users').get(userController.getAll)
router.route('/users/:userId').get(userController.getSingle)


export default router