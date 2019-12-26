import express from 'express';
import socket from 'socket.io';
import {validationResult} from 'express-validator';

import {DialogModel, MessageModel, ProjProjectModel} from '../models';

class ProjProjectController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }


  getAll = async (req, res) => {
    let projectsArr:Array<any>;

    // Member projects
    await ProjProjectModel.find({})
      .then(projects => {
        projects.map((project:any) => {
          project.teamMembers && project.teamMembers.map(member => {
            if (member.email == req.user.email) {
              projectsArr.push(project);
            }
          });
        });
      })
      .catch(err => console.log(err));

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

// Combine with owner projects
    await ProjProjectModel.find({owner: OWNER})
      .then(projects => {
        let finalArr = [...projects, ...projectsArr];
        res.json(finalArr);
      })
      .catch(err => console.log(err));
  }
  ;

// @route GET api/projects/:id
// @desc Get specific project by id
// @access Private
  getById = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(422).send({ errors: errors.mapped() });
    }

    let guid = req.params.id;

    ProjProjectModel.findOne({_id: guid}).then(project => {
      console.log(project);
      res.json(project)
    });
  }
;


  create = async (req: express.Request, res: express.Response) => {
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const NEW_PROJECT = await new ProjProjectModel({
      owner: OWNER,
      name: req.body.projectName,
      teamMembers: req.body.members
    });

    NEW_PROJECT.save().then(project => {
      console.log(project)
      res.json(project)
    })
      .catch(e => {
        console.log(e)
      });
  };

  // @route PATCH api/projects/update
// @desc Update an existing project
// @access Private
  update = (req, res) => {
    let projectFields = {name: req.body.projectName, teamMembers: req.body.members};

    ProjProjectModel.findOneAndUpdate(
      {_id: req.body.id},
      {$set: projectFields},
      {new: true}
    )
      .then(project => {
        res.json(project);
      })
      .catch(err => console.log(err));
  };


  delete = (req: express.Request, res: express.Response) => {
    ProjProjectModel
      .findOneAndRemove(req.params.id)
      .then(project => {
        if (project) {
          res.json({
            message: `Dialog deleted`,
          });
        }
      }).catch(() => {
      res.json({
        message: `Dialog not found`,
      });
    });
  };
}

export default ProjProjectController;
