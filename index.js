// inspired by: https://github.com/blakeembrey/variadic (this did not support both variadic and array as last option)
// inspired by: https://www.npmjs.org/package/spread-args (this seemed a bit heavy for my needs)
// inspired by: https://github.com/bmeck/es6-spread-rest (this seemed a bit heavy for my needs)
// this works, if you want to specify the last argument index manually: return Array.isArray(arg) ? arg : [].slice.call(args, 2);

// see: ECMAScript 6 and Spread Operator (http://ariya.ofilabs.com/2013/03/es6-and-spread-operator.html)
// see: ECMAScript 6 and Rest Parameter (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)

var slice = Array.prototype.slice;

/**
 * Generate a function that accepts a variable number of arguments as the last
 * function argument.
 *
 * @param  {Function} fn
 * @return {Function}
 */
function variadic(fn) {
  var count = Math.max(fn.length - 1, 0);

  return function () {
    var last, args;

    args = slice.call(arguments, 0, count);
    last = arguments[count];
    last = Array.isArray(last) ? last : slice.call(arguments, count);
    args.push(last);

    return fn.apply(this, args);
  };
};

var matches = variadic(function matches(subject, words) {
  console.log();
  console.log(subject);
  console.log(words);
});

matches("matches: array", ["one", "two", "three"]);
matches("matches: variadic", "one", "two", "three");

var pets = variadic(function pets(subject, name, siblings, pets) {
  console.log();
  console.log(subject);
  console.log(name, siblings, pets);
});

pets("pets: array", "Mycah", ["senae", "domonique"], ["tyty", "poobear"]);
pets("pets: variadic", "Mycah", ["senae", "domonique"], "tyty", "poobear");

