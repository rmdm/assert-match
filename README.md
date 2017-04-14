[![Build Status](https://travis-ci.org/rmdm/assert-match.svg?branch=master)](https://travis-ci.org/rmdm/assert-match)
[![Coverage Status](https://coveralls.io/repos/github/rmdm/assert-match/badge.svg?branch=master)](https://coveralls.io/github/rmdm/assert-match?branch=master)

assert-match
===============

`assert-match` is the enhancement of the standard `assert` module with matchers.

Short example
=============

```javascript
import assert from 'assert-match'
import { loose, arrayOf, type } from 'assert-match/matchers'

const actual = {
        str: 'abc',
        obj: { b: 1, c: 2 },
        nums: [ 1, 2, 'x' ],
    },
    expected = {
        str: 'abc',
        obj: loose({ b: 1 }),
        nums: arrayOf(type('number')),
    }

assert.deepEqual(actual, expected)

//  In your test runner you get something similar to:
//
//  AssertionError: { str: 'abc', obj: { b: 1 }, nums: [ 1, 2, 'x' ] } deepEqual
//  { str: 'abc',  obj: { b: 1 }, nums: [ 1, 2, { '[typeof]': 'number' } ] }
//        + expected - actual
//
//         {
//           "nums": [
//             1
//             2
//        -    "x"
//        +    {
//        +      "[typeof]": "number"
//        +    }
//           ]
//           "obj": {
//             "b": 1
//           }

```

Installation
============

```shell
    npm install assert-match
```

Usage
=====

Use `assert-match` in all the same places where you would use built-in `assert`:

```javascript
const assert = require('assert-match')

// ...

assert.deepEqual(actual, expected)
```

Assertions
----------

`assert-match` enhances standard `assert`'s assertions of `deep`-family:

- ```assert.deepEqual (actual, expected, [message])```
- ```assert.deepStrictEqual (actual, expected, [message])```
- ```assert.notDeepEqual (actual, expected, [message])```
- ```assert.notDeepStrictEqual (actual, expected, [message])```

`assert-match` allows you to check **actual** value (or its property) not
against a specific **expected** value (or ist property) as standard `deep`
assertions do, but aganst a matcher or a combination of them.
Without using matchers these assertions behave exactly like their standard
counterparts which [has been tested](test/core/test-assert.spec.js) against the
same set of tests as the standard ones.

Other assertions of `assert` are also exported by `assert-match` but not
enhanced with matchers support.

Matchers
--------

A matcher is an objects used to check if a value satisfies some requirements.

Matchers can be placed on the top level of **expected** value or on some of its
properties.

An awesome point about matchers is the ability to combine them! It gives you a
way to create powerful matching structures using small set of matchers.

Matchers and combinations of them can be reused and recombined across multiple
assertions.

In cases of assertion errors matchers participate in providing your test runner
with error details.

`assert-match` defines the following matchers:

- [strict (expected)](#strict-expected)
- [loose (expected)](#loose-expected)
- [any (expected)](#any-expected)
- [not (expected)](#not-expected)
- [every (expected)](#every-expected)
- [some (expected)](#some-expected)
- [arrayOf (expected)](#arrayOf-expected)
- [type (expected)](#type-expected)
- [primitive (expected)](#primitive-expected)
- [regex (expected)](#regex-expected)
- [gt (expected)](#gt-expected)
- [gte (expected)](#gte-expected)
- [lt (expected)](#lt-expected)
- [lte (expected)](#lte-expected)
- [custom (expectedFn)](#custom-expectedFn)

In all of the following matchers descriptions **actual** refers to **actual**
value or its property, corresponding to the matcher in **expected**, both passed
to an assertion.

### `strict (expected)`

Returns an insatnce of the root matchers class. All other matchers inherit from
that class. It checks whether two values are equal in depth. Actual comparison
opeartor (== or ===) for primitives depends on assertion in which this matcher
is used (for example, == is used for `deepEqual` whereas === is used for
`deepStrictEqual`). If **expected** contains a matcher somewhere on it, then
check for corresponding **actual** value is passed to that matcher.
If applied to another matcher it produces equivalent one, meaning that for
example `strict(aMatcher(expected))` returns matcher equivalent to
`aMatcher(expected)`. Actually, `deepEqual` and `deepStrictEqual` assertions
wrap its **expected** argument in `strict` matcher implicitly.

### `loose (expected)`

Similar to `strict` matcher but requires only subset of **actual** properties to
be equal in depth to those of **expected**.

### `any (expected)`

Matches anything. Can be used if value or existance of a specific **actual**
property does not matter.

### `not (expected)`

It implicitly wraps **expected** in `strict` matcher, matches **actual** value
against it and inverts result. `notDeepEqual` and `notDeepStrictEqual`
assertions wrap its **expected** argument in `not` matcher implicitly.

### `every (expected)`

**expected** should be an array. If it is not, than it is treated as one-element
array. Each element of the array is wrapped implicitly in `strict` matcher.
`every` matcher checks whether **actual** value matches all matchers of
**expected**.

### `some (expected)`

**expected** should be an array. If it is not, than it is treated as one-element
array. Each element of the array is wrapped implicitly in `strict` matcher.
`every` matcher checks whether **actual** value matches at least one matcher of
**expected**.

### `arrayOf (expected)`

Expects **actual** value to be an array, check fails if it is not. Implicitly
wraps **expected** in `strict` matcher. Checks each element of the array against
**expected** matcher.

### `type (expected)`

if **expected** is a string than **actual** is checked to be a primitive of that
type. If **expected** is a constructor than **actual** is checked to be an
instance of that type.

### `primitive (expected)`

**actual** and **expected** both converted to primitive and compared.

### `regex (expected)`

**expected** is converted to a RegExp and **actual** is tested against it.

### `gt (expected)`

Checks if **actual** greater than **expected**.

### `gte (expected)`

Checks if **actual** greater than or equal to **expected**.

### `lt (expected)`

Checks if **actual** less than **expected**.

### `lte (expected)`

Checks if **actual** less than or equal to **expected**.

### `custom (expectedFn)`

If **expectedFn** is not a function than this matcher fallbacks to `strict`
matcher. An **actual** value is passed to **expectedFn** to check.
**expectedFn** should return either boolean result or an object with
the `match` and `expected` fields. boolean `match` property says whether check
passed and `expected` is used in error reporting.
<!--
What about power-assert?
========================

The short answer is: `>:3`-->

Examples
========

FAQ
===

<!--### Why does matchers are strict by default?

### Why yet another matchers library?

### Why not pluginable?

overhead-->

Related projects
================
<!--
- power-assert-match
- babel-preset-power-assert-match
- babel-plugin-empower-assert-match-->
