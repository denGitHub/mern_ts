import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';

dotenv.config();

import './core/db';
import createRoutes from './core/routes';
import createSocket from './core/socket';

const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

app.use((req,res,next)=>{
  console.log("Time:",new Date())
  next()
});

app.use((err, req, res, next)=>{
  console.error(err.stack);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('unauthorised', err)
  // render the error page
  res.status(err.status || 500);
  return res.json({message:err.message||'error'});
});

const PORT = process.env.PORT || 3003;
http.listen(PORT, function() {
  console.log(`Server: http://localhost:${PORT}`);
});
