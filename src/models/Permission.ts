import mongoose, { Schema, Document } from 'mongoose';
const uuid = require ("node-uuid");
//const Schema = mongoose.Schema;
import {httpMethods}  from './data';

const aclSchema = new Schema({
  GUID: {
    type: String,
    default: uuid.v4 ()
  },
  resources: {
    type: [String],
    required: true,
    index: true
  },
  methods: {
    type: [String],
    required: true,
    index: true,
    enum: httpMethods
  }
});

const permissionSchema = new Schema({
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
  description: {
    type: String
  },
  inheritedPermissions: [String],
  acl: {
    type: [aclSchema],
    required: true
  }
});

permissionSchema.pre('save', function(next) {
  const p: any = this;
  p.modified = new Date();
  next();
});


const Permission = mongoose.model('Permission', permissionSchema);

export  default Permission;