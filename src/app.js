import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import router from './routes/views.router.js';

const app = express();

app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())

app.set('views', `${__dirname}/views`);
app.set('view engine', handlebars )

app.use('/', router)

const server = app.listen(8080, ()=>{
    console.log('server is running')})
const io = new Server(server);

const messages = [];

io.on('connection', socket =>{
    console.log('Nuevo Cliente conectado')

    socket.on('message', data =>{
        messages.push(data);
        io.emit('messagesLogs', messages);
    });

    socket.on('authenticated', data =>{
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', data);
    });
})