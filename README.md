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

Express is a node.js web application framework that provides elegant code and easier to write. [Visit official website to get more information](https://ejs.co/).

```js
// app.js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('./about.html', { root: __dirname });
});

app.get('/about-me', (req, res) => {
  res.redirect('/about');
});

app.use((req, res) => {
  res.status(404).sendFile('/404.html', { root: __dirname });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
```

Express provides many benefits as you can see the code above: no need to config res.header to tell the response you send is html, plain text, etc.

## Template Engine

Template engine enables you to use static template files in your application. It replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client at run time.

### EJS (Embedded JavaScript Templating)

Generate HTML markup with plain JavaScript

1. Install EJS via npm

```
npm i ejs
```

2. Let express now that you use ejs

```js
const express = require('express');

const app = express();

// register template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/about-me', (req, res) => {
  res.redirect('about');
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
```

3. Create views folder and create file with `.ejs` extension.

```html
<!-- index.ejs -->
<body>
  <% const name = 'Jane'%>
  <section>
    <h1><%= name %> Computer Spec</h1>
    <p>Name: Asus Tuff Gaming DT</p>
    <p>Display: 15.6 inches</p>
    <p>Ram: DDR4 8 GB</p>
    <p>Disk: SSD 512 GB</p>
  </section>
  <a href="/about">Go to about page</a>
</body>
```

- `<% %>` - no input tag use to write JS code like initial variable
- `<%= %>` - output HTML value
- `<%# %>` - comment
- `<%- %>` - output unescaped characters or HTML element using in partial

#### Passing data into views

```js
// app.js
const express = require('express');
const specs = require('./data.json').specs;

const app = express();

// register template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', specs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/about-me', (req, res) => {
  res.redirect('about');
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
```

```html
<!-- index.ejs -->
<body>
  <% const name = 'Jane'%>
  <section>
    <h1><%= name %> Computer Spec</h1>
    <% if (specs.length > 0) { %> <% specs.forEach(spec => { %>
    <p>Name: <%= spec.name %></p>
    <p>Display: <%= spec.display %></p>
    <p>Ram: <%= spec.ram %></p>
    <p>Disk: <%= spec.disk %></p>
    <hr />
    <% }) %> <% } else { %>
    <p>No <%= name %>'s computer spec to display</p>
    <% } %>
  </section>
  <a href="/about">Go to about page</a>
</body>
```

#### Partial

Create template and store in .ejs file like a component and use `<%- include('path') %>` to include that template in main .ejs file.

```html
<!-- head.ejs -->
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Computer Spec | <%= title %></title>
</head>
```

```html
<!-- spec.ejs -->
<section>
  <h1>My Computer Spec</h1>
  <% if (specs.length > 0) { %> <% specs.forEach(spec => { %>
  <p>Name: <%= spec.name %></p>
  <p>Display: <%= spec.display %></p>
  <p>Ram: <%= spec.ram %></p>
  <p>Disk: <%= spec.disk %></p>
  <hr />
  <% }) %> <% } else { %>
  <p>No <%= name %>'s computer spec to display</p>
  <% } %>
</section>
```

```html
<!-- index.ejs -->
<!DOCTYPE html>
<html lang="en">
  <%- include('./partials/head.ejs') %>
  <body>
    <%- include('./partials/spec.ejs') %>
    <a href="/about">Go to about page</a>
  </body>
</html>
```

## Middleware

Middleware is a code which runs between getting a request and sending a response.

- log details of every request
- authenticate and protected routes
- parse JSON data from requests
- return 404 pages

```js
// app.js
app.use((req, res, next) => {
  console.log('new request:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next(); // send to the next middleware
});

app.use((req, res, next) => {
  console.log('The next middleware');
});
```

The order of middleware is important. When you send the request back to the server, other middleware below will not working.

### morgan

morgan is a HTTP request logger middleware for node.js (third-party middleware).

```js
const morgan = require('morgan');

app.use(morgan('dev'));
```

### static middleware

By default, node.js not let the user access the file directly on browser. If you want to give client an access, you can use `app.use(express.static('FILE_NAME')`.

```js
app.use(express.static('public'));
```

The example above, make every files in public folder can be access. It means you can now import external CSS file into your HTML page.

Now, you can create public/styles.css to add CSS to your .ejs file and you can open this styles.css directly on browser by typing `http://localhost:4000/styles.css`. You could see that the word `public/` is not required.

## MongoDB

MongoDB is a NoSQL database. To connect MongoDB, you can use Mongoose package and connect to MongoDB Atlas (cloud database).

### Mongoose

Mongoose is an ODM (Object Document Mapping Library). First, you have to create schemas and models.

- Schemas defines the structure of a type of data or document such as name (string), age (number).
- Models allow you to communicate with database collection.

```js
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const specs = require('./data.json').specs;
const cors = require('cors');
require('dotenv').config({ path: './.env' });

const app = express();

// enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.once('open', () => {
  console.log('connected to database');
  app.listen(4000, () => {
    console.log('listening on port 4000');
  });
});

// register template engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', specs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/about-me', (req, res) => {
  res.redirect('about');
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
```

### Model

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaptopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: false,
    },
    ram: {
      type: String,
      required: true,
    },
    disk: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// find collection
module.exports = mongoose.model('Laptop', LaptopSchema);
```

### Get All Data in Collection

```js
app.get('/all-specs', (req, res) => {
  Spec.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
```

### Get a Single Data in Collection

```js
app.get('/specs/:id', (req, res) => {
  const id = req.params.id;
  Spec.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
```

### Saving Data in Collection

```js
// app.js
const Spec = require('./models/Laptop');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
...
app.post('/add-spec', (req, res) => {
  const spec = new Spec(req.body);

  spec
    .save()
    .then((result) => {
      res.send({ message: 'add spec successfully' });
    })
    .catch((err) => {
      console.log(err);
    });
});
```

### Delete Data in Collection

```js
app.delete('/specs/:id', (req, res) => {
  const id = req.params.id;
  Spec.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
```

### Update Data in Collection

```js
app.put('/specs/:id', (req, res) => {
  const id = req.params.id;
  Spec.findByIdAndUpdate(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
```

### Essential Express Method

1. `app.use(express.urlencoded({ extended: true }));`

   When you need to accept form data, you need to convert from url encoded to object with below command from express (else it will be undefined).

2. `app.use(express.static('<FOLDER_OR_FILE>')`
   Make that folder or file be public and enable to access from client side.

3. `app.use(express.json()):`
   Convert JSON String to JSON Object

## Express Router

Separate routes in the projects to be in multiple files which helps all routes in express be more easy to maintain.

```js
// routes/specRoutes.js
const express = require('express');
const Spec = require('../models/laptop');

const router = express.Router();

// get all specs
router.get('/specs', (req, res) => {
  Spec.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// add a spec
router.post('/add-spec', (req, res) => {
  const spec = new Spec(req.body);

  spec
    .save()
    .then((result) => {
      res.send({ message: 'add spec successfully' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get a single spec
router.get('/specs/:id', (req, res) => {
  const id = req.params.id;
  Spec.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete a single spec
router.delete('/specs/:id', (req, res) => {
  const id = req.params.id;
  Spec.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// update a single spec
router.put('/specs/:id', (req, res) => {
  const id = req.params.id;
  Spec.findByIdAndUpdate(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
```

```js
// app.js
const specRoutes = require('./routes/specRoutes');
...
app.use(specRoutes);
// or scope
app.use('/specs', specRoutes);
```

## MVC (Model-View-Controller)

MVC is an architectural pattern to structure code and files. It keeps code more modular, reusable and easier to read.

1. Model - data schema & database
2. View - UI
3. Controller - interface between Model and View
