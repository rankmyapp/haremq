const Queue = require('./queue');

module.exports = class Client {
  isConnected = false;
  constructor(connection, channel, url) {
    this.connection = connection;
    this.channel = channel;
    this.url = url;
    this.isConnected = true;
    this.connection.on('close', () => {
      this.isConnected = false;
    });
  }

  setPrefetchCount(count, global) {
    this.channel.prefetch(count, global);
  }

  async reconnect() {
    this.connection = await ampq.connect(url);
    this.channel = await this.connection.createChannel();
  }

  async queue(name, options) {
    await this.channel.assertQueue(name, { durable: true, 'x-queue-mode': 'lazy', ...options });
    return new Queue(this, name);
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }

  get isAlive() {
    return this.isConnected;
  }
}
