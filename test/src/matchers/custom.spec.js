'use strict'

import assert from 'assert'
import Custom from '../../../src/matchers/custom'
import { type } from '../../../src/matchers'

describe('custom matcher', function () {

    describe('match method', function () {

        it('does plain strict match comparision if expected is not a function', function () {

            const actual = { a: 5, b: 10 }
            const expected = { a: 5, b: '10' }

            const custom = new Custom(expected)
            const comparator = () => true

            const result = custom.match(actual, comparator)

            assert.deepEqual(result, {
                match: true,
                actual: { a: 5, b: 10 },
                expected: { a: 5, b: 10 },
            })
        })

        it('returns true if custom function returns true', function () {

            const actual = { a: 5, b: 10 }
            const expected = function (actual) {
                return actual.a === 5
            }

            const custom = new Custom(expected)

            const result = custom.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: { a: 5, b: 10 },
                expected: { a: 5, b: 10 },
            })
        })

        it('returns false if custom function returns false', function () {

            const actual = { a: 5, b: 10 }
            const expected = function (actual) {
                return actual.a !== 5
            }

            const custom = new Custom(expected)

            const result = custom.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5, b: 10 },
                expected: '[custom]',
            })
        })

        it('returns false if custom function returns match false', function () {

            const actual = { a: 5, b: 10 }
            const expected = function (actual) {
                return { match: actual.a !== 5 }
            }

            const custom = new Custom(expected)

            const result = custom.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5, b: 10 },
                expected: '[custom]',
            })
        })

        it('returns true if custom function returns true result', function () {

            const actual = { a: 5, b: 10 }
            const expected = function (actual) {
                return actual.a === 5
                    ? { match: true, expected: { a: 5 } } // expected is ignored if match
                    : { match: false, expected: '[a is five]' }
            }

            const custom = new Custom(expected)

            const result = custom.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: { a: 5, b: 10 },
                expected: { a: 5, b: 10 },
            })
        })

        it('returns true if custom function returns true result', function () {

            const actual = { a: 5, b: 10 }
            const expected = function (actual) {
                return actual.a !== 5
                    ? { match: true, expected: { a: 5 } } // expected is ignored if match
                    : { match: false, expected: '[a is five]' }
            }

            const custom = new Custom(expected)

            const result = custom.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5, b: 10 },
                expected: {'[custom]': '[a is five]'},
            })
        })

        it('returns true if another matched used in custom returned true', function () {

            const actual = { a: 5, b: 10 }
            const expected = function (actual) {
                return type('number').match(actual.a)
            }

            const custom = new Custom(expected)

            const result = custom.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: { a: 5, b: 10 },
                expected: { a: 5, b: 10 },
            })
        })

        it('returns false if another matched used in custom returned true', function () {

            const actual = { a: 5, b: 10 }
            const expected = function (actual) {
                return type('string').match(actual.a)
            }

            const custom = new Custom(expected)

            const result = custom.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5, b: 10 },
                expected: { '[custom]': { '[typeof]': 'string' } },
            })
        })

    })

})
