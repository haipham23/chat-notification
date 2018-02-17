var SCWorker = require('socketcluster/scworker');

class Worker extends SCWorker {
  // Override the run function.
  // It will be executed when the worker is ready.
  run() {
    const self = this;

    self.scServer.on('connection', (socket) => {
      socket.on('new_message', ({from, to, msg}) => {
        self.scServer.exchange.publish(`new_message_${from}_${to}`, { msg })
      });

      socket.on('typing', (from, to) => self.scServer.exchange.publish(`${from}isTyping${to}`));
      socket.on('stop typing', (from, to) => self.scServer.exchange.publish(`${from}stopTyping${to}`));
    });
  }
}

new Worker();