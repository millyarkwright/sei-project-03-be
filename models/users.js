import mongoose from 'mongoose'

const moviePreferenceSchema = new mongoose.Schema({
  moviesLiked: { type: Array, default: ['likes:'], required: true },
  moviesDisliked: { type: Array, default: ['dislikes:'], required: true },
  // moviesToShow: { type: mongoose.Schema.ObjectId, ref: 'Movie', required: true },
})

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, 
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  moviePreferences: [moviePreferenceSchema],
  createdAt: { type: Date, default: Date.now() },
})

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true }, 
//   username: { type: String, required: true, unique: true }, 
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin', 'user'], default: 'user' },
//   moviesLiked: { type: [mongoose.Schema.ObjectId], ref: 'Movies' },
//   moviesDisliked: { type: [mongoose.Schema.ObjectId], ref: 'Movies' },
//   createdAt: { type: Date, default: Date.now() },
// })

export default mongoose.model('User', userSchema)
