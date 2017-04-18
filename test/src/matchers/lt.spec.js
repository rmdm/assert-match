'use strict'

import assert from 'assert'
import Lt from '../../../src/matchers/lt'

describe('lt matcher', function () {

    describe('match method', function () {

        it('returns true if actual value is less than expected', function () {

            const actual = 'a', expected = 'x'
            const lt = new Lt(expected)

            const result = lt.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: 'a',
                expected: 'a',
            })
        })

        it('returns false if actual value is greater than or equal to expected', function () {

            const actual = 10, expected = 10
            const lt = new Lt(expected)

            const result = lt.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: 10,
                expected: { '[less than]': 10 },
            })
        })

        it('returns false for objects', function () {

            const actual = { a: 5 }, expected = { b: 10 }
            const lt = new Lt(expected)

            const result = lt.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5 },
                expected: { '[less than]': { b: 10 } },
            })
        })

    })

})
