'use strict'

import assert from 'assert'
import match from '../../../src/asserts/match'

describe('match assert', function () {

    it('does not throw when first object matches the second one', function () {

        const first = {
                a: 1,
                b: 2,
                c: 3,
            },
            second = {
                a: '1',
            }

        match(first, second)
    })

    it('throws when first object does not match the second one', function () {

        const first = {
                a: 1,
                c: 10,
            },
            second = {
                a: '1',
                b: 5,
            }

        try {

            match(first, second)

            throw new Error('"match" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepStrictEqual(e.actual, {a: 1})
            assert.deepStrictEqual(e.expected, {a: '1', b: 5})
            assert.equal(e.operator, 'match')
            assert.equal(e.message, '{ a: 1 } match { a: \'1\', b: 5 }')
            assert.equal(e.generatedMessage, true)
        }
    })

})
