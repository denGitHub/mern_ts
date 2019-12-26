import { check } from "express-validator";
import {httpMethods} from "../../models/data";
const { ValidationUtil } = require("../ValidationUtil");

export default [
  check('id').isUUID(4).withMessage(ValidationUtil.messages.uuid)
];