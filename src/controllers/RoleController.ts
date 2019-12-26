import express from 'express';
import bcrypt from 'bcrypt';
import socket from 'socket.io';
import {validationResult} from 'express-validator';
import _ from 'lodash';
import mailer from '../core/mailer';

import {PermissionModel, RoleModel, UserModel} from '../models';
import {IUser} from '../models/User';
import {createJWToken} from '../utils';

//const { UserModel} = require("../models");


class RoleController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  show = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      res.json(user);
    });
  };

  getAll = (req, res, next) => {
    RoleModel.find({}).populate('permissions').exec((err, roles) => {
      if (err) {
        return next(err);
      }

      res.send(roles);
    });
  }

  getById = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({errors: errors.mapped()});
    }

    RoleModel.findOne({_id: req.params.id}).populate('permissions').exec((err, role) => {
      if (err) {
        return next(err);
      }

      if (!role) {
        return res.status(404).send('Not Found');
      }

      res.send(role);
    });
  };

  create = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({errors: errors.mapped()});
    }

    const role = new RoleModel(req.body);
    role.save((err, result) => {
      if (err) {
        return next(err);
      }

      result.populate('permissions', (err) => {
        if (err) {
          return next(err);
        }

        res.location(`${req.baseUrl}/${result._id}`).status(201).send(result);
      });
    });

  }

  /**
   * Update role
   */
 /* update = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({errors: errors.mapped()});
    }

    RoleModel.findOne({_id: req.params.id}, (err, role:RoleModel) => {
      if (err) {
        return next(err);
      }

      if (!role) {
        return res.status(404).send('Not Found');
      }

      role = _.assign(role, req.body);
      role.permissions = req.body.permissions;

      role.save((err, result) => {
        if (err) {
          return next(err);
        }

        result.populate('permissions', (err) => {
          if (err) {
            return next(err);
          }

          res.send(result);
        });
      });
    });
  };*/

/*  delete = (req, res, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({errors: errors.mapped()});
    }

    RoleModel.findOne({_id: req.params.id}, (err, role) => {
      if (err) {
        return next(err);
      }

      if (!role) {
        return res.status(404).send('Not Found');
      }

      UserModel.updateMany({roles: role._id}, {$pull: {roles: role._id}}, (err, result) => {
        if (err) {
          return next(err);
        }

        role.remove({_id: req.params.id}, (err, result) => {
          if (err) {
            return next(err);
          }

          res.status(204).send();
        });
      });
    });
  };*/

}

export default RoleController;
