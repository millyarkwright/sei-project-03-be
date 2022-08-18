import express from 'express'
import moviesController from './controllers/moviesController.js'

const router = express.Router()

router.get('/', (req, res) => {
  return res.status(200).send('/ router working')
})

router.route('/movies').get(moviesController.getAll)

export default router