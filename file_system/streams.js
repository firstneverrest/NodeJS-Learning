const fs = require('fs');

const readStream = fs.createReadStream('./lorem.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./new_lorem.txt');

// event listener
readStream.on('data', (chunk) => {
  console.log('------- NEW CHUNK -------');
  console.log(chunk);
  writeStream.write('\nWriteStream\n');
  writeStream.write(chunk);
});

// piping
// readStream.pipe(writeStream);
