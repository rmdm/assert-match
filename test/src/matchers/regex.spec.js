'use strict'

import assert from 'assert'
import Regex from '../../../src/matchers/regex'

describe('regex matcher', function () {

    describe('match method', function () {

        it('returns false if actual does not match expected regex', function () {

            const actual = 'abc', expected = '^bc'
            const regex = new Regex(expected)

            const result = regex.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: 'abc',
                expected: '/^bc/',
            })
        })

        it('returns true if actual matches expected regex', function () {

            const actual = 'abc', expected = '^ab'
            const regex = new Regex(expected)

            const result = regex.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: 'abc',
                expected: 'abc',
            })
        })

    })

})
