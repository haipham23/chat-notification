var SCBroker = require('socketcluster/scbroker');
var scClusterBrokerClient = require('scc-broker-client');

class Broker extends SCBroker {
  run() {
    console.log('   >> Broker PID:', process.pid);

    // This is defined in server.js (taken from environment variable SC_CLUSTER_STATE_SERVER_HOST).
    // If this property is defined, the broker will try to attach itself to the SC cluster for
    // automatic horizontal scalability.
    // This is mostly intended for the Kubernetes deployment of SocketCluster - In this case,
    // The clustering/sharding all happens automatically.

    if (this.options.clusterStateServerHost) {
      scClusterBrokerClient.attach(this, {
        stateServerHost: this.options.clusterStateServerHost,
        stateServerPort: this.options.clusterStateServerPort,
        authKey: this.options.clusterAuthKey,
        stateServerConnectTimeout: this.options.clusterStateServerConnectTimeout,
        stateServerAckTimeout: this.options.clusterStateServerAckTimeout,
        stateServerReconnectRandomness: this.options.clusterStateServerReconnectRandomness
      });
    }
  }
}

new Broker();

// var scRedis = require('sc-redis');

// module.exports.run = function (broker) {
//   console.log('   >> Broker PID:', process.pid);
//   scRedis.attach(broker);
// };
