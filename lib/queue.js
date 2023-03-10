const { compress, decompress } = require("./gzipUtils");

module.exports = class Queue {
  constructor(client, name, isCompressed = false) {
    this.client = client;
    this.name = name;
    this.isCompressed = isCompressed;
  }

  publish(data, options) {
    const content = this.isCompressed ? compress(JSON.stringify(data)) : JSON.stringify(data);
    const preparedData = Buffer.from(content);
    return this.client.channel.sendToQueue(this.name, preparedData, { persistent: true, ...options });
  }

  consume(consumer, options) {
    return this.client.channel.consume(this.name, message => {
      const content = this.isCompressed ? decompress(message.content.toString()) : message.content.toString();
      const data = JSON.parse(content);

      const done = () => {
        this.client.channel.ack(message);
      }

      const reject = () => {
        this.client.channel.nack(message);
      }

      consumer(data, done, reject);
    }, options);
  }
}
