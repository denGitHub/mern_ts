const { User, Role, Permission }  = require('../models');

export  class ValidationUtil {
  static messages= {
    email: "must be an email address",
    required: "field required",
    phone: "must be in format +18885451122",
    uuid: "must be uuid v4 format",
    numeric: "must be numeric",
    postalCode: "must be a 'US' postal code",
    invalid: "invalid field",
    array: "must be an array",
    cannotSet: "cant set field"
  };

  static isArray (value)  {
    return Array.isArray(value);
  };

  static isStringArray (value) {
    if(value) {
      if(Array.isArray(value)) {
        for(let i=0;i<value.length;i++) {
          if(typeof value[i] !== "string") {
            return false;
          }
        }
      } else {
        return false;
      }
    }

    return true;
  };

  static isPermissionKey (value, { req })  {
    return new Promise((resolve, reject) => {
      if(value) {
        Permission.findOne({key: value}, (err, result) => {
          if (err) {
            return reject('db error');
          }

          if (!result || (result && result._id === req.params.id)) {
            return resolve(true);
          } else {
            return reject(`permission key ${value} exists`);
          }
        });
      } else {
        return resolve(true);
      }
    });
  };

  static isPermission  (value) {
    return new Promise((resolve, reject) => {
      if(value) {
        Permission.findOne({_id: value}, (err, result) => {
          if (err) {
            return reject('db error');
          }

          if (result) {
            return resolve(true);
          } else {
            return reject(`permission ${value} does not exists`);
          }
        });
      } else {
        return resolve(true);
      }
    });
  };

  static isRoleKey (value, { req }) {
    return new Promise((resolve, reject) => {
      if(value) {
        Role.findOne({key: value}, (err, result) => {
          if (err) {
            return reject('db error');
          }

          if (!result || (result && result._id === req.params.id)) {
            return resolve(true);
          } else  {
            return reject(`role key ${value} exists`);
          }
        });
      } else {
        return resolve(true);
      }
    });
  };

  static isRole (value)  {
    return new Promise((resolve, reject) => {
      if(value) {

        Role.findOne({ _id: value}, (err, result) => {
          if (err) {
            return reject('db error');
          }

          if (result) {
            return resolve(true);
          } else {
            return reject(`all roles must exists`);
          }
        });
      } else {
        return resolve(true);
      }
    });
  };


  static isUsernameValid (value) {
    return new Promise((resolve, reject) => {
      if(value) {
        User.findOne({ username: value }, (err, result) => {
          if (err) {
            return reject('db error');
          }

          if(!result) {
            return resolve(true);
          } else {
            return reject(`username exists`);
          }
        });
      } else {
        return resolve(true);
      }
    });
  };

  static isEmailValid  (value)  {
    return new Promise((resolve, reject) => {
      if(value) {
        User.findOne({ email: value }, (err, result) => {
          if (err) {
            return reject('db error');
          }

          if(!result) {
            return resolve(true);
          } else {
            return reject(`email exists`);
          }
        });
      } else {
        return resolve(true);
      }
    });
  };
}