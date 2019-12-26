//const passport = require("passport");
const {Permission} = require("../models");

export default async (req: any)=>{
//    console.log('Request URL:', req.baseUrl)
    const par = {
      method: req.method.toLowerCase(),
      url: req.baseUrl.toLocaleString(),
    }
    let allowed = false;
    try {
      let per = await  Permission.find();
      per.map(i => {
        const permissions = i.acl.toObject();
        permissions.map(item => {
          //throw new Error('oops')
          if (item.resources.includes(par.url) && item.methods.includes(par.method)) {
            console.log('allowed');
            allowed = true;
            return;
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
    return allowed;
  }


