import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true
  },
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  }
});

var User = mongoose.model('User', UserSchema);

export default User;
