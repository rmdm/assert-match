'use strict'

import assert from 'assert'
import Lte from '../../../src/matchers/lte'

describe('lte matcher', function () {

    describe('match method', function () {

        it('returns true if actual value is less than expected', function () {

            const actual = 'a', expected = 'x'
            const lte = new Lte(expected)

            const result = lte.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: 'a',
                expected: 'a',
            })
        })

        it('returns true if actual value is equal to expected', function () {

            const actual = 10, expected = 10
            const lte = new Lte(expected)

            const result = lte.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: 10,
                expected: 10,
            })
        })

        it('returns false if actual value is greater than to expected', function () {

            const actual = 10, expected = 5
            const lte = new Lte(expected)

            const result = lte.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: 10,
                expected: { '[less than or equal to]': 5 },
            })
        })

        it('returns true for objects', function () {

            const actual = { a: 5 }, expected = { b: 10 }
            const lte = new Lte(expected)

            const result = lte.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: { a: 5 },
                expected: { a: 5 },
            })
        })

    })

})
