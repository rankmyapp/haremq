module.exports = class Queue {
  constructor(client, name) {
    this.client = client;
    this.name = name;
  }

  publish(data, options) {
    const preparedData = Buffer.from(JSON.stringify(data));
    return this.client.channel.sendToQueue(this.name, preparedData, { persistent: true, ...options });
  }

  consume(consumer, options) {
    return this.client.channel.consume(this.name, message => {
      const data = JSON.parse(message.content.toString());

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
