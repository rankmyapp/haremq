const { connect } = require('../index');

(async () => {
  const client = await connect();
  const queue = await client.queue('teste');

  queue.consume((data, done, reject) => {
    console.log('aceitou a mensagem');
    done();
  })
})();
