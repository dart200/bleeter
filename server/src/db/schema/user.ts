
const mongoose = require('mongoose');

export const userSchema = new mongoose.Schema({
  userName:   {type: String},
  firstName:  {type: String},
  lastName:   {type: String},
  email:      {type: String},
  contacts:   {type: Array},
});