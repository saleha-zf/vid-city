// User Schema\
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: String,
    password: String,
  });
  
const User = mongoose.model("User", userSchema);
export default User;