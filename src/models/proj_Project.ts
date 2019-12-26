import uuid from "node-uuid";
import mongoose, { Schema, Document } from 'mongoose';

// Create Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Object,
    required: true
  },
  teamMembers: [
    {
      email: {
        type: String
      },
      name: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("proj_projects", ProjectSchema);
