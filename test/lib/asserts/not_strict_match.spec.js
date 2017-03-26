'use strict'

import assert from 'assert'
import notStrictMatch from '../../../src/asserts/not_strict_match'

describe('notStrictMatch assert', function () {

    it('does not throw when first object does not strictly match the second one', function () {

        const first = {
                a: 1,
                b: 2,
                c: 3,
            },
            second = {
                a: '1',
            }

        notStrictMatch(first, second)
    })

    it('throws when first object strictly matches the second one', function () {

        const first = {
                a: 1,
                b: 2,
            },
            second = {
                a: 1,
            }

        try {

            notStrictMatch(first, second)

            throw new Error('"notStrictMatch" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepStrictEqual(e.actual, {a: 1})
            assert.deepStrictEqual(e.expected, {a: 1})
            assert.equal(e.operator, 'notStrictMatch')
            assert.equal(e.message, '{ a: 1 } notStrictMatch { a: 1 }')
            assert.equal(e.generatedMessage, true)
        }
    })

})
