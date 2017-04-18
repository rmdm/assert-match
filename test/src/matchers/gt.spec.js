'use strict'

import assert from 'assert'
import Gt from '../../../src/matchers/gt'

describe('gt matcher', function () {

    describe('match method', function () {

        it('returns true if actual value is greater than expected', function () {

            const actual = 'x', expected = 'a'
            const gt = new Gt(expected)

            const result = gt.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: 'x',
                expected: 'x',
            })
        })

        it('returns false if actual value is less than or equal to expected', function () {

            const actual = 10, expected = 10
            const gt = new Gt(expected)

            const result = gt.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: 10,
                expected: { '[greater than]': 10 },
            })
        })

        it('returns false for objects', function () {

            const actual = { a: 5 }, expected = { b: 10 }
            const gt = new Gt(expected)

            const result = gt.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5 },
                expected: { '[greater than]': { b: 10 } },
            })
        })

    })

})
