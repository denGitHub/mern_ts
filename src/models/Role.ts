import mongoose, { Schema, Document } from 'mongoose';
const uuid = require ("node-uuid");

const roleSchema = new Schema({
  GUID: {
    type: String,
    default: uuid.v4 ()
  },
  key: {
    type: String,
    required: true,
    index: 'hashed',
    unique: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  permissions: {
    type: [{
      type: String,
      ref: 'Permission',
      index: true
    }],
    default: []
  }
});

roleSchema.pre('save', function(next) {
  this.populate('permissions', err => {
    if(err) {
     // logger.error(err);
      next();
    }
  });
});




const Role = mongoose.model('Role', roleSchema);

export  default  Role;