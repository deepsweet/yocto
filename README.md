## yocto [![Build Status](https://secure.travis-ci.org/deepsweet/yocto.png)](https://travis-ci.org/deepsweet/yocto)

yocto is fun, small (min.js ≈1K and min.js.gz ≈ 600B) and experimental library which allows you to chain all the default DOM Element methods and properties like this:

```javascript
$$$('div')
    .style({background: 'red', color: '#fff'})
    .setAttribute('data-test', 2)
    .addEventListener('click', function(e) { console.log(e) })
    .lastElementChild()
        .className('last-child')
        .querySelectorAll('span')
            .style({color: '#0f0'})
            .innerHTML()
```

that's 137 items in the latest Google Chrome, for example.

```javascript
console.dir($$$.prototype)
```

### additional features

```javascript
$$$('body') instanceof Array
// true
```

`$$$` can:

* handle all the same selectors as `querySelectorAll`
* create element with `$$$('<div/>')`
* wrap single element with `$$$(document.body)`
* wrap elements collectons like `NodeList` and any other Array-Like objects with `$$$(document.body.childNodes)`

### test & lint

* all: `npm test`
* unit (still in progress): open `test/test.html` in your browser or run `npm run-script unit` for [testing with PhantomJS](https://github.com/metaskills/mocha-phantomjs)
* [eslint](https://github.com/nzakas/eslint): `npm run-script eslint`
* [jscs](https://github.com/mdevils/node-jscs): `npm run-script jscs`

### license

[WFTPL](https://github.com/deepsweet/yocto/blob/master/LICENSE)
