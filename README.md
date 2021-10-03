# Node.js Learning

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It enable JavaScript to run outside the browser. [Visit official website for more information](https://nodejs.org/en/).

## Global Object

When you try `console.log(global)` via node.js, you could see every functions that you can use in node.js. For example, clearInterval, setTimeout. However, you don't need to refer to global when you use these functions. However, You still cannot access window object.

```js
// global object
console.log(global);

// global function
setTimeout(() => {
  console.log('This is setTimeout');
  clearInterval(interval);
}, 4000);

const interval = setInterval(() => {
  console.log('This is setInterval');
}, 1000);

// print current directory
console.log(__dirname);

// print current file name
console.log(__filename);
```

## Modules and Require

Split file into multiple files with `require()` and `module.export`.

```js
// module1.js
const module2 = require('./module2');

// module2.js
const fruits = ['banana', 'orange', 'apple'];

console.log(fruits);
```

When you run module1.js, it will run commands in module2.js. Therefore, it shows fruits array in the console. However, you can't access any variable or function in module2.js because module2.js doesn't has export data.

```js
// module1.js
const { fruits, prices } = require('./module2');

console.log(fruits);
console.log(prices);

// module2.js
const fruits = ['banana', 'orange', 'apple'];
const prices = [20, 30, 25];

module.exports = {
  fruits,
  prices,
};
```

Use `module.exports` to export variables or functions.

## Built-in modules

There are also built-in modules which you don't need to create a file.

```js
const os = require('os');

console.log(os.platform(), os.homedir());
```

## File system

One of the built-in modules which is highly important.

- fs.readFile('FILE_NAME', callback) - read a file (asynchronous running)
- fs,writeFile('FILE_NAME', 'MESSAGE', callback) - write a file (asynchronous running)
- fs,appendFile('FILE_NAME', 'MESSAGE', callback) - append a file (asynchronous running)
- fs.unlink('FILE_NAME', callback) - delete a file
- fs.rename('OLD_FILE_NAME', 'NEW_FILE_NAME', callback) - rename a file
- fs.existsSync('FILE_NAME') - return true if the file or directory is existed
- fs.mkdir('FOLDER_NAME', callback) - create a folder
- fs.rmdir('FOLDER_NAME', callback) - delete a folder

```js
// file.js
const fs = require('fs');

// reading file
fs.readFile('post.txt', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data); // show buffer
  console.log(data.toString()); // show actual text
});

// writing file
fs.writeFile(
  './post.txt',
  'The shadow has covered the old town for a long time.',
  () => {
    console.log('File was written');
  }
);

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
```

## Streams and Buffer

If the data are extremely huge, reading files could be very long time. Therefore, Streams and Buffer come to solve this problem. The concept is start using data, before it has finished loading.

- Streams is like a path that deliver some data to the destination
- Buffers is a temporary memory that a stream takes to hold some data. When the buffers is full, the data will be sent to the destination.

```js
const fs = require('fs');

const readStream = fs.createReadStream('./lorem.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./new_lorem.txt');

// similar to event listener
readStream.on('data', (chunk) => {
  console.log('------- NEW CHUNK -------');
  console.log(chunk);
  writeStream.write('\nWriteStream\n');
  writeStream.write(chunk);
});
```

### Piping

Piping in a readable stream is used to attach a writable stream to readable stream. Whatever it read from readStream, it will write that in a file. You can use in case of read one file to write in other file.

```js
// piping
readStream.pipe(writeStream);
```

## Clients & Servers

### Creating a server

Import http built-in module and use `http.createServer()` to create server. Then, you can access request and response object (req, res).

```js
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method); // print / GET

  res.setHeader('Content-Type', 'text/plain');

  res.write('Greetings!'); // show text on screen
  res.end();
});

server.listen(4000, 'localhost', () => {
  console.log('listening on port 4000');
});
```

### Request object

Get access to request from client side.

- req.url - get url that client access
- req.method - get REST method that sended from client

### Response object

Config response object before send response to the client.

- res.setHeader() - config response header such as you want to send html to the client, you can use `res.setHeader('Content-Type', 'text/html')` and then res.write('<p>Greetings!</p>).
- res.write() - write text on screen
- res.end() - end response

### Return HTML Page

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  fs.readFile('./index.html', (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
      // or
      // res.end(data)
    }
  });
});

server.listen(4000, 'localhost', () => {
  console.log('listening on port 4000');
});
```

### Routing

Use switch case to create routes and get `req.url` to get path that user went.

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  let path = './';
  switch (req.url) {
    case '/':
      path += 'index.html';
      break;
    case '/about':
      path += 'about.html';
      break;
    default:
      path += '404.html';
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(4000, 'localhost', () => {
  console.log('listening on port 4000');
});
```

### Status Codes

Status codes describe the type of response sent to the browser such as 200 OK, 201 Created, 404 Not Found, etc.

```js
let path = './';
switch (req.url) {
  case '/':
    path += 'index.html';
    res.statusCode = 200;
    break;
  case '/about':
    path += 'about.html';
    res.statusCode = 200;
    break;
  default:
    path += '404.html';
    res.statusCode = 404;
    break;
}
```

### Redirect

Use `res.setHeader('Location, 'path')` to redirect user. Status code 301 (move permanently) can be sent when redirect user.

```js
let path = './';
switch (req.url) {
  case '/':
    path += 'index.html';
    res.statusCode = 200;
    break;
  case '/about':
    path += 'about.html';
    res.statusCode = 200;
    break;
  case '/about-me':
    res.statusCode = 301;
    res.setHeader('Location', '/about');
    res.end();
  default:
    path += '404.html';
    res.statusCode = 404;
    break;
}
```

## Express

Express is a node.js web application framework that provides cleaner code and easier to write.
