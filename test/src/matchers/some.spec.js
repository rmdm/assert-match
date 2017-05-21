'use strict'

import assert from 'assert'
import Some from '../../../src/matchers/some'
import { primitive, type } from '../../../src/matchers'

describe('some matcher', function () {

    let comparator

    beforeEach(function () {
        comparator = (a, b) => a === b
    })

    describe('match method', function () {

        it('returns true if element matches an expected element', function () {

            const actual = 5, expected = [0, type('number'), primitive(10)]
            const some = new Some(expected)

            const result = some.match(actual, comparator)

            assert.deepEqual(result, {
                match: true,
                actual: 5,
                expected: 5,
            })
        })

        it('returns false if does not match any expected element', function () {

            const actual = 5, expected = [0, type('string'), primitive(10)]
            const some = new Some(expected)

            const result = some.match(actual, comparator)

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: {
                    '[some of]': [
                        0,
                        { '[typeof]': 'string' },
                        { '[primitively matches]': 10 },
                    ],
                },
            })
        })

        it('returns true if expected is not an array but actual matches it', function () {

            const actual = 5, expected = type('number')
            const every = new Some(expected)

            const result = every.match(actual, comparator)

            assert.deepEqual(result, {
                match: true,
                actual: 5,
                expected: 5,
            })
        })

        it('returns false if expected is not an array and actual does not match it', function () {

            const actual = 5, expected = type('string')
            const every = new Some(expected)

            const result = every.match(actual, comparator)

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: { '[typeof]': 'string' },
            })
        })

    })

})
