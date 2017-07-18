# autoFetch

[![npm](https://img.shields.io/npm/v/autofetch.svg?style=flat-square)](https://www.npmjs.com/package/autofetch)

fetch api with customer auto pre actions

## Installation
```
$ npm install autoFetch
```

## Why Not `isomorphic-fetch`
- More api for node env
  - Headers.keys
  - Headers.values
- global baseHost,callback,headers,queries and url params

## Usage
```js
require('autoFetch');

fetch.baseHost('http://domain.com');

fetch('//path'); // http://domain.com/path;

fetch.baseHost((url)=>{
  return url += '/path';
})

fetch('//path'); // http://domain.com/path;

fetch('//user/:id',{ params: { id: 123 } }); // http://domain.com/user/123

fetch.callback((response)=>{
  console.log(response);
  return response;
});
````
## Contribution
PR and issue welcome
