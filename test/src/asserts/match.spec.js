'use strict'

import assert from 'assert'
import initMatch from '../../../src/asserts/match'

describe('match assert', function () {

    let match

    beforeEach(function () {
        match = initMatch(assert)
    })

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
            assert.deepEqual(e.actual, {a: 1})
            assert.deepEqual(e.expected, {a: '1', b: 5})
            assert.equal(e.operator, 'match')
            assert(/ match /.test(e.message)) // { a: 1 } match { a: \'1\', b: 5 }
        }
    })

    it('able to match objects with null prototype', function () {

        const first = Object.create(null, {
                a: {
                    value: 5,
                    enumerable: true
                }
            }),
            second = { a: 5 }

        match(first, second)

    })

    it('does not throw when equal primitives are matched', function () {
        match(5, '5')
    })

    it('throws when not equal primitives are matched', function () {
        assert.throws(function () {
            match(5, 6)
        })
    })

})
