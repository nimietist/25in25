import socketio from 'socket.io';

export default function(app) {
  let io = app.io = socketio(app.port);

  io.on('connection', function (socket) {

  });
}
