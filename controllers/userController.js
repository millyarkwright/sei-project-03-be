import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CONSTS from '../consts.js'
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

  // ? Check passwords match
  if (newUser.password !== newUser.confirmedPassword) {
    console.log('passing 1st if statement - passwords do not match')
    return res.status(400).json({ message: 'Password do not match' })
  } 

  // ? Encrypt Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newUser.password, salt)

  // ? Spread in newUser object and replace password with encrypted pw
  const createdUser = await UserModel.create({
    ...newUser,
    password: hashedPassword,
  })

  // ? Add user to db
  await UserModel.create(createdUser)

  return res.status(200).json({ message: `User: ${newUser.username} has been successfully created!` })
}

const login = async (req, res, next) => {
  const { username, password } = req.body

  try {
    // ? Find user in db
    const user = UserModel.findOne({ username })

    // ? If user doesn't exist
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // ? Check passwords match
    const passwordsMatch = await bcrypt.compare(password, user.password)
    
    // ? If passwords don't match
    if (!passwordsMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // ? If all checks above are passed, generate token

    const payLoad = {
      username: user.username,
      email: user.email,
    }

    const opts = {
      expiresIn: '7 days',
    }

  } catch (error) {
    next(error)
  }
}


export default ({ getAll, getSingle, register, login })