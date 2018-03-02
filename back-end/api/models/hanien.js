var mongoose = require('mongoose');

var hanienSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  component: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  seller: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
 
});

mongoose.model('hanien', hanienSchema);
