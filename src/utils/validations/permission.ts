import { check } from "express-validator";
import {httpMethods} from "../../models/data";
const { ValidationUtil } = require("../ValidationUtil");

export default [
  check('name').exists().withMessage(ValidationUtil.messages.required),
  check('key').custom(ValidationUtil.isPermissionKey),
  check('acl').custom(ValidationUtil.isArray).withMessage(ValidationUtil.messages.array),
  check('acl.*.resources').custom(ValidationUtil.isStringArray).withMessage(ValidationUtil.messages.array),
  check('acl.*.permissions').custom(ValidationUtil.isStringArray).withMessage(ValidationUtil.messages.array),
  check('acl.*.permissions.*').isIn(httpMethods).withMessage(`must be ${httpMethods.join(',')}`),
  check('_id').not().exists().withMessage(ValidationUtil.messages.cannotSet),
];