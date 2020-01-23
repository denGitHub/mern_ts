import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";
import { updateLastSeen, checkAuth, checkAcl } from "../middlewares";
import multer from "./multer";

import {
  loginValidation,
  registerValidation,
  permissionValidation,
  permissionDeleteValidation,
  roleValidation
} from "../utils/validations";

import {
  UserCtrl,
  DialogCtrl,
  MessageCtrl,
  UploadFileCtrl,
  PermissionCtrl,
  RoleCtrl,

  ProjectCtrl,
  TaskCtrl
} from "../controllers";

const createRoutes = (app: express.Express, io: socket.Server) => {
  const UserController = new UserCtrl(io);
  const DialogController = new DialogCtrl(io);
  const MessageController = new MessageCtrl(io);
  const UploadFileController = new UploadFileCtrl();
  const PermissionController = new PermissionCtrl(io);
  const RoleController = new RoleCtrl(io);
  const ProjectController = new ProjectCtrl(io);
  const TaskController = new TaskCtrl(io);

  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);

  app.get('/api/permissions', PermissionController.getAll);
  app.get('/api/permissions/:id', PermissionController.getById);
  app.post('/api/permissions', permissionValidation,  PermissionController.create);
  app.put('/api/permissions/:id', permissionValidation,  PermissionController.update);
  app.delete('/api/permissions/:id', permissionDeleteValidation,  PermissionController.delete);

  app.get('/api/roles', RoleController.getAll);
  app.get('/api/roles/:id', RoleController.getById);
  app.post('/api/roles', roleValidation, RoleController.create);
//  app.put('/api/roles/:id', RoleController.update);
//  app.put('/api/roles/:id', RoleController.delete);

  app.get("/user/me", UserController.getMe);
  app.get("/user/verify", UserController.verify);
  app.post("/user/signup", UserController.create);
  //app.post("/user/signup", registerValidation, UserController.create);
  app.post("/user/signin", loginValidation, UserController.login);
  app.get("/user/find", UserController.findUsers);
  app.get("/user/:id", UserController.show);
  app.delete("/user/:id", UserController.delete);

  app.get("/dialogs",checkAcl, DialogController.index);
  app.delete("/dialogs/:id", DialogController.delete);
  app.post("/dialogs", DialogController.create);

  app.get("/messages", MessageController.index);
  app.post("/messages", MessageController.create);
  app.delete("/messages", MessageController.delete);

  app.post("/files", multer.single("file"), UploadFileController.create);
  app.delete("/files", UploadFileController.delete);

  //Project
  app.get("/api/proj/project", ProjectController.getAll);
  app.get("/api/proj/project/:id", ProjectController.getById);
  app.post("/api/proj/project", ProjectController.create);
  app.put("/api/proj/project", ProjectController.update);
  app.delete("/api/proj/project", ProjectController.delete);

  app.get("/api/proj/task/:id", TaskController.getById);
  app.post("/api/proj/task", TaskController.create);
  app.patch("/api/proj/project", TaskController.updateById);
  app.delete("/api/proj/project", TaskController.deleteById);

};

export default createRoutes;
