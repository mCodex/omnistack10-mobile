import socketio from 'socket.io-client';

const socket = socketio('http://localhost:3333', { autoConnect: false });

const subscribeToNewDevs = subscribeFunction => {
  return socket.on('newDev', subscribeFunction);
};

const connect = (latitude, longitude, techs) => {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };

  return socket.connect();
};

const disconnect = () => socket.connected && socket.disconnect();

export { connect, disconnect, subscribeToNewDevs };
