[![Build Status](https://travis-ci.org/rmdm/assert-match.svg?branch=master)](https://travis-ci.org/rmdm/assert-match)
[![Coverage Status](https://coveralls.io/repos/github/rmdm/assert-match/badge.svg?branch=master)](https://coveralls.io/github/rmdm/assert-match?branch=master)

assert-match
===============

`assert-match` is a set of additional assertions focused on matching. Unlike
standard deep equality comparision assertions, which requires two arguments to
have exactly the same sets of properties, `assert-match`' assertions requires
one's arg properties to be superset of another arg properties.

Rationale
=========

There are times when I need to check only subset of an object porperties to have
specific values. Hence this module. An alternative approach would be to use a
combination of standard `assert` and some utility library providing matching
capability, for example `_.isMatch`. `assert-match` has the following
advantages:

- it provides your test runner with hints about actual and expected
outcomes of the test
- gives your more consistent results with family of standard `deep`-assertions

Installation
============

```shell
    npm install assert-match
```

Usage
=====

### ```assert (obj)```

The function returned by the module. Can be used to extend any passed **obj**
object in it, for example, standard `assert` module:

```javascript
const assert = require('assert')
require('assert-match')(assert)

// ...

assert.match(actual, expected)
```

`assert-match` can also be used standalone:

```javascript
const assert = require('assert-match')

// ...

assert.match(actual, expected)
```

Assertions
----------

### ```assert.match (actual, expected, message)```

Tests whether the set of properties of the **actual** arg is superset of
**expected** arg properties. Optional custom **message** is set on error when
the assertion fails. Primitive values are compared with `==`. Comparable to
standard `assert`'s `deepEqual` assertion but with another requirement on
properties sets comparison.

### ```assert.strictMatch (actual, expected, message)```

Same as `match`, but primitives are compared with `===`. Comparable to
`assert`'s `deepStrictEqual`.

### ```assert.notMatch (actual, expected, message)```

Same as `match`, but primitives are compared with `!=`. Comparable to `assert`'s
`notDeepEqual`.

### ```assert.notStrictMatch (actual, expected, message)```

Same as `match`, but primitives are compared with `!==`. Comparable to
`assert`'s `notDeepStrictEqual`.

Examples
========

```javascript

import assert from 'assert-match'

describe('examples', function () {

    it('matches primitives', function () {
        assert.match(5, '5')
    })

    it('matches primitives strictly', function () {
        assert.strictMatch(5, 5)
    })

    it('matches objects', function () {
        assert.match({a: 1, b: 2, c: 3}, {a: 1})
    })

    it('throws when objects do not match', function () {
        assert.match({a: 1, b: 2, c: 3}, {a: 10})
    })

})

// RESULT

//   examples
//     ✓ matches primitives
//     ✓ matches primitives strictly
//     ✓ matches objects
//     1) throws when objects do not match


//   3 passing (82ms)
//   1 failing

//   1) examples throws when objects do not match:

//       AssertionError: { a: 1 } match { a: 10 }
//       + expected - actual

//        {
//       -  "a": 1
//       +  "a": 10
//        }

```
