const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();

const port = process.env.PORT || 1234;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  console.log('a user connected!')
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
  socket.on('chatMessage', (msg) => {
    // reply to the client
    // socket.emit('chatMessage', 'test');
    // broadcast to everyone
    io.emit('updateMessages', msg);
  })
});

http.listen(port, () => console.log(`App available at http://localhost:${port}`));