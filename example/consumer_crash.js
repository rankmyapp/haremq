const { connect } = require('../index');

(async () => {
  const client = await connect();
  const queue = await client.queue('teste');

  queue.consume((data, done, reject) => {
    throw new Error();
  })
})();
