'use strict'

import assert from 'assert'
import initNotDeepStrictEqual from '../../../src/asserts/not_deep_strict_equal'
import { loose, type, gt, arrayOf } from '../../../src/matchers'

describe('notDeepStrictEqual assertion', function () {

    let notDeepStrictEqual

    beforeEach(function () {
        notDeepStrictEqual = initNotDeepStrictEqual(assert)
    })

    it('does not throw when actual not deep equals expected', function () {

        const actual = {
                a: 1,
                b: 2,
                c: 3,
            },
            expected = {
                a: '1',
                b: 2,
                c: '5',
            }

        notDeepStrictEqual(actual, expected)
    })

    it('throws when actual deep equals expected', function () {

        const actual = {
                a: 1,
                c: 10,
            },
            expected = {
                a: 1,
                c: 10,
            }

        try {

            notDeepStrictEqual(actual, expected)

            throw new Error('"notDeepStrictEqual" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepEqual(e.actual, { a: 1, c: 10 })
            assert.deepEqual(e.expected, { '[not]': { a: 1, c: 10 }})
            assert.equal(e.operator, 'notDeepStrictEqual')
            assert(/ notDeepStrictEqual /.test(e.message))
        }
    })

    it('able to compare objects with null prototype', function () {

        const actual = Object.create(null, {
                a: {
                    value: 5,
                    enumerable: true
                }
            }),
            expected = Object.create(null, {
                a: {
                    value: 7,
                    enumerable: true
                }
            })

        notDeepStrictEqual(actual, expected)

    })

    it('does not throw when not equal primitives are compared', function () {

        notDeepStrictEqual(5, 7)
    })

    it('throws when equal primitives are compared', function () {

        assert.throws(function () {
            notDeepStrictEqual(5, 5)
        })
    })

    it('does not throw when actual is compared to expected with matchers', function () {

        const actual = {
                a: {
                    b: 1,
                    c: 2,
                },
                d: [1, 2, 3, 4, 5, 'a'],
                e: 'abc',
            },
            expected = {
                a: loose({ b: 1 }),
                d: arrayOf(type('number')),
                e: gt('ab!'),
            }

        notDeepStrictEqual(actual, expected)
    })

    it('throws when actual is compared to expected with matchers', function () {

        const actual = {
                d: [1, 2, 3],
                e: 'abc',
            },
            expected = {
                d: arrayOf(type('number')),
                e: gt('ab!'),
            }

        try {

            notDeepStrictEqual(actual, expected)

            throw new Error('"notDeepStrictEqual" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepEqual(e.actual, {
                d: [1, 2, 3],
                e: 'abc',
            })
            assert.deepEqual(e.expected, {
                '[not]': {
                    d: [1, 2, 3],
                    e: 'abc',
                }
            })
            assert.equal(e.operator, 'notDeepStrictEqual')
            assert(/ notDeepStrictEqual /.test(e.message))

        }
    })

})
