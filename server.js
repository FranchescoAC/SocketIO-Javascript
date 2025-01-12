const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir el archivo HTML del cliente
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Conectar al cliente con el evento 'connection'
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  
  // Escuchar el evento 'message' del cliente
  socket.on('message', (data) => {
    console.log('Mensaje recibido del cliente:', data);
    // Enviar un mensaje al cliente
    socket.emit('message', 'Hola, cliente!');
  });

  // Desconexión
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});

// Escuchar en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
