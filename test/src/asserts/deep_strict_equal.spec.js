'use strict'

import assert from 'assert'
import initDeepStrictEqual from '../../../src/asserts/deep_strict_equal'
import { loose, type, gt, arrayOf } from '../../../src/matchers'

describe('deepStrictEqual assertion', function () {

    let deepStrictEqual

    beforeEach(function () {
        deepStrictEqual = initDeepStrictEqual(assert)
    })

    it('does not throw when actual deep strict equals expected', function () {

        const actual = {
                a: 1,
                b: 2,
                c: 3,
            },
            expected = {
                a: 1,
                b: 2,
                c: 3,
            }

        deepStrictEqual(actual, expected)
    })

    it('throws when actual does not deep strict equal expected', function () {

        const actual = {
                a: 1,
                c: 10,
            },
            expected = {
                a: '1',
                c: 10,
            }

        try {

            deepStrictEqual(actual, expected)

            throw new Error('"deepStrictEqual" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepEqual(e.actual, {a: 1, c: 10})
            assert.deepEqual(e.expected, {a: '1', c: 10})
            assert.equal(e.operator, 'deepStrictEqual')
            assert(/ deepStrictEqual /.test(e.message))
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
                    value: 5,
                    enumerable: true
                }
            })

        deepStrictEqual(actual, expected)

    })

    it('does not throw when strict equal primitives are compared', function () {

        deepStrictEqual(5, 5)
    })

    it('throws when not strict equal primitives are compared', function () {

        assert.throws(function () {
            deepStrictEqual(5, '5')
        })
    })

    it('does not throw when actual is compared to expected with matchers', function () {

        const actual = {
                a: {
                    b: 1,
                    c: 2,
                },
                d: [1, 2, 3, 4, 5],
                e: 'abc',
            },
            expected = {
                a: loose({ b: 1 }),
                d: arrayOf(type('number')),
                e: gt('ab!'),
            }

        deepStrictEqual(actual, expected)
    })

    it('throws when actual is compared to expected with matchers', function () {

        const actual = {
                a: {
                    b: 1,
                    c: 2,
                },
                d: [1, 2, 3, 'a'],
                e: 'abc',
            },
            expected = {
                a: loose({ b: 1 }),
                d: arrayOf(type('number')),
                e: gt('ab!'),
            }

        try {

            deepStrictEqual(actual, expected)

            throw new Error('"deepEqual" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepEqual(e.actual, {
                a: {
                    b: 1,
                },
                d: [1, 2, 3, 'a'],
                e: 'abc',
            })
            assert.deepEqual(e.expected, {
                a: {
                    b: 1,
                },
                d: [1, 2, 3, {'[typeof]': 'number'}],
                e: 'abc',
            })
            assert.equal(e.operator, 'deepStrictEqual')
            assert(/ deepStrictEqual /.test(e.message))

        }
    })

    it('respects objects occuring in several places in hierarchy', function () {

        const a = { value: 10 }

        deepStrictEqual([ a, a ], [ { value: 10 }, { value: 10 } ])
    })
})
