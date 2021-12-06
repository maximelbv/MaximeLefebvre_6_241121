import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({path:'./config/config.env'});

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);