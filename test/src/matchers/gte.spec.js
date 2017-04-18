'use strict'

import assert from 'assert'
import Gte from '../../../src/matchers/gte'

describe('gte matcher', function () {

    describe('match method', function () {

        it('returns true if actual value is greater than expected', function () {

            const actual = 'x', expected = 'a'
            const gte = new Gte(expected)

            const result = gte.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: 'x',
                expected: 'x',
            })
        })

        it('returns true if actual value is equal to expected', function () {

            const actual = 10, expected = 10
            const gte = new Gte(expected)

            const result = gte.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: 10,
                expected: 10,
            })
        })

        it('returns false if actual value is less than to expected', function () {

            const actual = 5, expected = 10
            const gte = new Gte(expected)

            const result = gte.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: { '[greater than or equal to]': 10 },
            })
        })

        it('returns true for objects', function () {

            const actual = { a: 5 }, expected = { b: 10 }
            const gte = new Gte(expected)

            const result = gte.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: { a: 5 },
                expected: { a: 5 },
            })
        })

    })

})
