'use strict'

import assert from 'assert'
import initStrictMatch from '../../../src/asserts/strict_match'

describe('strictMatch assert', function () {

    let strictMatch

    beforeEach(function () {
        strictMatch = initStrictMatch(assert)
    })

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
            assert.deepEqual(e.actual, {a: 1})
            assert.deepEqual(e.expected, {a: '1'})
            assert.equal(e.operator, 'strictMatch')
            assert(/ strictMatch /.test(e.message)) // { a: 1 } strictMatch { a: '1' }
        }
    })

    it('does not throw when equal primitives are matched strictly', function () {
        strictMatch(5, 5)
    })

    it('throws when not strictly equal primitives are matched', function () {
        assert.throws(function () {
            strictMatch(5, '5')
        })
    })

})
