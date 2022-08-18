const errorHandler = (error, req, res, next) => {
  console.log(`Server side error: ${error}`)
  console.log(`Error Name: ${error.name}`)
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ObjectID' })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid JsonWebToken' })
  }

  return res.status(500).send('Send went wrong')
}

export default errorHandler 