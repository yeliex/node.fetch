# autoFetch

[![npm](https://img.shields.io/npm/v/autofetch.svg?style=flat-square)](https://www.npmjs.com/package/autofetch)

fetch api with customer auto pre actions

## Installation
```
$ npm install autoFetch
```

## Usage
```js
require('autoFetch');

fetch.baseHost('http://domain.com');

fetch('//path'); // http://domain.com/path;

fetch.baseHost((url)=>{
  return url += '/path';
})

fetch('//path'); // http://domain.com/path;

fetch.callback((response)=>{
  console.log(response);
  return response;
});
````

