# Simple Parameter Injector [![Build Status](https://travis-ci.org/dimitri-koenig/simple-parameter-injector.svg?branch=master)](https://travis-ci.org/dimitri-koenig/simple-parameter-injector)

[![npm version](https://badge.fury.io/js/simple-parameter-injector.svg)](http://badge.fury.io/js/simple-parameter-injector)
[![Dependency Status](https://david-dm.org/dimitri-koenig/simple-parameter-injector.svg)](https://david-dm.org/dimitri-koenig/simple-parameter-injector)

Simple Parameter Injector is a Javascript module which injects parameters out of array's and object's into strings.

## Installation

Run this command:
```
$ npm install simple-parameter-injector --save
```


## Examples

```javascript
var paramsInjector = require('simple-parameter-injector');

// injecting a string into another string
var str = paramsInjector.inject('replace this ? with a real string', 'placeholder');
// output: replace this placeholder with a real string


// injecting a number into a string
var str = paramsInjector.inject('mambo nr ?', 5);
// output: mambo nr 5


// injecting an array of placeholders into a string
var str = paramsInjector.inject('replace this ? with another ?', ['placeholder', 'real string']);
// output: replace this placeholder with another real string


// injecting an object of named placeholders into a string
var placeholders = {
    firstString: 'placeholder',
    secondString: 'real string'
};
var str = paramsInjector.inject('replace this :firstString with another :secondString', placeholders);
// output: replace this placeholder with another real string


// injecting an object of named placeholders into another object with placeholders
var placeholders = {
    firstString: 'placeholder',
    secondString: 'real string'
};
var obj = {
    firstKey: 'i need a :firstString',
    secondKey: 'with a :secondString'
};
var resultObject = paramsInjector.inject(obj, placeholders);
// resultObject: {
//     firstKey: 'i need a placeholder',
//     secondKey: 'with a real string'
// }
```


## Versioning

`Simple Parameter Injector` follows [Semantic Versioning 2.0.0](http://semver.org)


## Contributing

1. [Fork it!](https://github.com/dimitri-koenig/simple-parameter-injector/fork)
2. Create your feature branch (`git checkout -b feature/my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Create new Pull Request


## Author

Dimitri König (@dimitrikoenig)


## License

The Simple Parameter Injector is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
