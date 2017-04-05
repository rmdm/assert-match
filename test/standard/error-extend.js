// https://github.com/nodejs/node/issues/3188
threw = false;

try {
  var ES6Error = class extends Error {};

  var AnotherErrorType = class extends Error {};

  const functionThatThrows = function() {
    throw new AnotherErrorType('foo');
  };

  assert.throws(functionThatThrows, ES6Error);
} catch (e) {
  threw = true;
  assert(e instanceof AnotherErrorType,
    `expected AnotherErrorType, received ${e}`);
}

assert.ok(threw);
