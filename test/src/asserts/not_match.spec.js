'use strict'

import assert from 'assert'
import notMatch from '../../../src/asserts/not_match'

describe('notMatch assert', function () {

    it('does not throw when first object does not match the second one', function () {

        const first = {
                a: 1,
                b: 2,
                c: 3,
            },
            second = {
                a: 2,
            }

        notMatch(first, second)
    })

    it('throws when first object matches the second one', function () {

        const first = {
                a: 1,
            },
            second = {
                a: '1',
            }

        try {

            notMatch(first, second)

            throw new Error('"notMatch" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepEqual(e.actual, {a: 1})
            assert.deepEqual(e.expected, {a: '1'})
            assert.equal(e.operator, 'notMatch')
            assert(/ notMatch /.test(e.message)) // { a: 1 } notMatch { a: '1' }
        }
    })

    it('does not throw when not equal primitives are matched', function () {
        notMatch(5, 10)
    })

    it('throws when equal primitives are matched', function () {
        assert.throws(function () {
            notMatch(5, '5')
        })
    })

})
