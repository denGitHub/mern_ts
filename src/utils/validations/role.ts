import { check } from "express-validator";
import {httpMethods} from "../../models/data";
const { ValidationUtil } = require("../ValidationUtil");

export default [
  check('name').exists().withMessage(ValidationUtil.messages.required),
  check('key')
    .exists().withMessage(ValidationUtil.messages.required)
    .custom(ValidationUtil.isRoleKey),
  check('permissions').custom(ValidationUtil.isStringArray).withMessage(ValidationUtil.messages.array),
  check('permissions.*').custom(ValidationUtil.isPermission),
  check('_id').not().exists().withMessage(ValidationUtil.messages.cannotSet),
];