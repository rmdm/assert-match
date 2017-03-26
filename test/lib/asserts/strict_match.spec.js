'use strict'

import assert from 'assert'
import strictMatch from '../../../src/asserts/strict_match'

describe('strictMatch assert', function () {

    it('does not throw when first object strictly matches the second one', function () {

        const first = {
                a: 1,
                b: 2,
                c: 3,
            },
            second = {
                a: 1,
            }

        strictMatch(first, second)
    })

    it('throws when first object does not strictly match the second one', function () {

        const first = {
                a: 1,
            },
            second = {
                a: '1',
            }

        try {

            strictMatch(first, second)

            throw new Error('"strictMatch" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepStrictEqual(e.actual, {a: 1})
            assert.deepStrictEqual(e.expected, {a: '1'})
            assert.equal(e.operator, 'strictMatch')
            assert.equal(e.message, '{ a: 1 } strictMatch { a: \'1\' }')
            assert.equal(e.generatedMessage, true)
        }
    })

})
