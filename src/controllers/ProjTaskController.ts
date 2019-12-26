import express from 'express';
import socket from 'socket.io';
import {validationResult} from 'express-validator';

import {ProjTasktModel} from '../models';

class ProjTaskController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  getById = (req, res) => {
    let id = req.params.id;
    ProjTasktModel.find({project: id}).then(tasks => res.json(tasks));
  }


  create = (req, res) => {
    const NEW_TASK = new ProjTasktModel({
      project: req.body.project,
      taskName: req.body.taskName,
      dateDue: req.body.dateDue,
      assignee: req.body.assignee
    });

    NEW_TASK.save()
      .then(task => res.json(task))
      .catch(err => console.log(err));
  }


  deleteById = (req, res) => {
    ProjTasktModel
      .findOneAndRemove(req.params.id)
      .then(task => {
          if (task) {
            res.json({
              message: `Task deleted`,
            });
          }
        }
      ).catch(() => {
      res.json({
        message: `Task not found`,
      });
    });
    ;
  }


  updateById = (req, res) => {

    let taskFields:any = {};

    taskFields.taskName = req.body.taskName;
    if (req.body.dateDue && req.body.dateDue !== "Date undefined") {
      taskFields.dateDue = req.body.dateDue;
    }
    taskFields.assignee = req.body.assignee;

    ProjTasktModel.findOneAndUpdate(
      {_id: req.body.id},
      {$set: taskFields},
      {new: true}
    )
      .then(task => {
        res.json(task);
      })
      .catch(err => console.log(err));
  }
}

export default ProjTaskController;
