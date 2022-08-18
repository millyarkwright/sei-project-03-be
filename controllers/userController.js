import UserModel from '../models/users.js'

// ! Get all users 

const getAll = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find()
    console.log('allusers->', allUsers)
    return res.status(200).json(allUsers)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// ! Get individual user

const getSingle = async (req, res, next) => {
  const { userId } = req.params
  console.log('userid', userId)
  try {
    const foundUser = await UserModel.findById(userId)
    if (!foundUser) {
      return res.status(404).json({ message: `User with ID ${userId} could not be found` })
    }
    return res.status(200).json(foundUser)
  } catch (error) {
    next(error)
  }
}

export default ({ getAll, getSingle })