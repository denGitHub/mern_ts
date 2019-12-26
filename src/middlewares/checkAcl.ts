//const passport = require("passport");
import {acl} from "../utils"
const {Permission} = require("../models");

export default async (req: any, res: any, next: Function) =>{
    console.log('Request URL:', req.baseUrl)
    acl(req)
      .then(()=>{
        return next()
      })
      .catch(err=>{
        return res.status(403).json({ message: "Invalid auth token provided." });
      })
  }


