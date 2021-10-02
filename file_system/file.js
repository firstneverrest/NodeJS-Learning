const fs = require('fs');

// reading file
// fs.readFile('post.txt', (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// writing file
// fs.writeFile(
//   './post.txt',
//   'The shadow has covered the old town for a long time.',
//   () => {
//     console.log('File was written');
//   }
// );

// directories
if (!fs.existsSync('./assets')) {
  fs.mkdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Folder was created');
  });
} else {
  fs.rmdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Folder was deleted');
  });
}
