import bcrypt from 'bcrypt'
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

// ! Register User 

const register = async (req, res, next) => {
  const { body: newUser } = req
  // console.log('register request->', newUser )

  // ? Check if credentials already exist

  const emailExists = await UserModel.findOne({ email: newUser.email })
  // console.log('email exists', emailExists)
  if (emailExists) {
    return res.status(400).json({ message: 'Email address already exists' })
  }

  const usernameExists = await UserModel.findOne({ username: newUser.username })
  if (usernameExists) {
    return res.status(400).json({ message: 'Username already exists' })
  }

  console.log('password->',  newUser.password)
  console.log('confirmedPassword->',  newUser.confirmedPassword)
  console.log('password = confpass->', newUser.password === newUser.confirmedPassword)
  console.log('password does not equal confpass->', newUser.password !== newUser.confirmedPassword)

  if (newUser.password === newUser.confimedPassword) {
    console.log('passing 2nd if statement - passwords match')
    return res.status(400).json({ message: 'Passwords match' })
  } 

  // // ? Check passwords match
  // if (newUser.password !== newUser.confimedPassword) {
  //   console.log('passing 1st if statement - passwrods donot match')
  //   return res.status(400).json({ message: 'Password do not match' })
  // } 


  // // ? Encrypt Password
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(newUser.password, salt)

  // // ? Spread in newUser object and replace password with encrypted pw
  // const createdUser = await UserModel.create({
  //   ...newUser,
  //   password: hashedPassword,
  // })

  // ? Add user to db
  await UserModel.create(newUser)

  return res.status(200).json({ message: `User: ${newUser.username} has been successfully created!` })
}

export default ({ getAll, getSingle, register })