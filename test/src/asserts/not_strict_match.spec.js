'use strict'

import assert from 'assert'
import initNotStrictMatch from '../../../src/asserts/not_strict_match'

describe('notStrictMatch assert', function () {

    let notStrictMatch

    beforeEach(function () {
        notStrictMatch = initNotStrictMatch(assert)
    })

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
            assert.deepEqual(e.actual, {a: 1})
            assert.deepEqual(e.expected, {a: 1})
            assert.equal(e.operator, 'notStrictMatch')
            assert(/ notStrictMatch /.test(e.message)) // { a: 1 } notStrictMatch { a: 1 }
        }
    })

    it('does not throw when not equal primitives are strictly matched', function () {
        notStrictMatch(5, '5')
    })

    it('throws when not equal primitives are matched', function () {
        assert.throws(function () {
            notStrictMatch(5, 5)
        })
    })

})
