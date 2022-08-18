import express from 'express'

const PORT = 4000

// ! Define Express App
const app = express()

app.get('/', (req, res, next) => {
  return res.status(200).send('Api is running')
})

// ! Start Server

const startServer = () => {

  app.listen(PORT, () => {
    console.log('Express server running on port 4000')
  })

}

startServer()