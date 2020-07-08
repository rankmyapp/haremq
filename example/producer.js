const { connect } = require('../index');

(async () => {
  const client = await connect();
  const queue = await client.queue('teste');

  queue.publish({teste: 1});
  client.close();
})();
