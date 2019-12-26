import express from 'express';
import bcrypt from 'bcrypt';
import socket from 'socket.io';
import {validationResult} from 'express-validator';
import _ from 'lodash';
import mailer from '../core/mailer';

import {UserModel} from '../models';
import {IUser} from '../models/User';
import {createJWToken} from '../utils';

const {PermissionModel, Role} = require("../models");


class PermissionController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  getAll = (req, res, next) => {
    PermissionModel.find({}, (err, permissions) => {
      if (err) {
        return next(err);
      }
      res.send(permissions);
    });
  }

  getById = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({errors: errors.mapped()});
    }
    PermissionModel.findOne({_id: req.params.id}, (err, permission) => {
      if (err) {
        return next(err);
      }
      if (!permission) {
        return res.status(404).send('Not Found');
      }
      res.send(permission);
    });
  };

  create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(422).send({ errors: errors.mapped() });
    }
    const permission = new PermissionModel(req.body);

    permission.save((err, result) => {
      if (err) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      res.location(`${req.baseUrl}/${result._id}`).status(201).send(result);
    });
  }


  /**
   * Update permission
   */
  update = (req, res, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({errors: errors.mapped()});
    }
    PermissionModel.findOne({_id: req.params.id}, (err: {}, permission) => {
      if (err) {
        return next(err);
      }

      if (!permission) {
        return res.status(404).send('Not Found');
      }

      permission = _.assign(permission, req.body);
      permission.acl = req.body.acl;

      permission.save((err: {}, result) => {
        if (err) {
          return next(err);
        }
        res.send(result);
      });
    });
  };


  delete = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return res.status(422).send({ errors: errors.mapped() });
    }
    PermissionModel.findOne({_id: req.params.id}, (err, permission) => {
      if (err) {
        return next(err);
      }

      if (!permission) {
        return res.status(404).send('Not Found');
      }

      permission.remove({_id: req.params.id}, (err, result) => {
        if (err) {
          return next(err);
        }

        return res.status(204).send();
      });

    });
  };

}

export default PermissionController;
