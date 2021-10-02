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
