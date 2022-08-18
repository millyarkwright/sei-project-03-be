import express from 'express'
import cors from 'cors'
import logger from './middleware/logger.js'
import errorHandler from './middleware/errorHandler.js'

const PORT = 4000

// ! Define Express App
const app = express()

// ! Allow requests from anywhere
app.use(cors())

// ! Convert request into valid JSON object
app.use(express.json())

// ! Middleware
app.use(logger)

app.use(errorHandler)


app.get('/', (req, res) => {
  return res.status(200).send('Api is running')
})


// ! Catching anything that falls through to this point
app.use((req, res) => {
  return res.status(404).send('Required endpoint not found')
})

// ! Start Server

const startServer = () => {

  app.listen(PORT, () => {
    console.log('Express server running on port 4000')
  })

}

startServer()