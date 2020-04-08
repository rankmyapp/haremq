const ampq = require('amqplib');
const Client = require('./lib/client');

const connect = async url => {
  const connection = await ampq.connect(url);
  const channel = await connection.createChannel();
  return new Client(connection, channel, url);
}

module.exports = { connect };
