const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the welcome message only once when a new user connects
  if (!socket.welcomeSent) {
    socket.welcomeSent = true;
    
  }

  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);

    // Check if the message is not the initial welcome message and not from the chatbot
    if (!msg.startsWith('Chatbot:')) {
    //   // Emit the user's message to everyone, excluding the sender
      socket.broadcast.emit('chat message', msg);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
