import uuid from "node-uuid";
import mongoose, { Schema, Document } from 'mongoose';
// Create Schema
const TaskSchema = new Schema({

  project: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'projects',
      index: true
    }],
    default: []
  },
  taskName: {
    type: String,
    required: true
  },
  dateDue: {
    type: String
  },
  assignee: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model("proj_tasks", TaskSchema);
