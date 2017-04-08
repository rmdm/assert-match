'use strict'

import assert from 'assert'
import Every from '../../../src/matchers/every'
import { primitive, type } from '../../../src/matchers'

describe('every matcher', function () {

    let comparator

    beforeEach(function () {
        comparator = (a, b) => a === b
    })

    describe('match method', function () {

        it('returns true if element matches every expected element', function () {

            const actual = 5, expected = [5, type('number'), primitive(5)]
            const every = new Every(expected)

            const result = every.match(actual, comparator)

            assert.deepEqual(result, {
                match: true,
                actual: 5,
                expected: 5,
            })
        })

        it('returns false if does not match every expected element', function () {

            const actual = 5, expected = [5, type('number'), primitive(10)]
            const every = new Every(expected)

            const result = every.match(actual, comparator)

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: {
                    '[every of]': [
                        5,
                        5,
                        10
                    ],
                },
            })
        })

        it('returns true if expected is not an array but actual matches it', function () {

            const actual = 5, expected = type('number')
            const every = new Every(expected)

            const result = every.match(actual, comparator)

            assert.deepEqual(result, {
                match: true,
                actual: 5,
                expected: 5,
            })
        })

        it('returns false if expected is not an array and actual does not match it', function () {

            const actual = 5, expected = type('string')
            const every = new Every(expected)

            const result = every.match(actual, comparator)

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: { '[typeof]': 'string' },
            })
        })

    })

})
