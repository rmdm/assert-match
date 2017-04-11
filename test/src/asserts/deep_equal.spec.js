'use strict'

import assert from 'assert'
import initDeepEqual from '../../../src/asserts/deep_equal'
import { loose, type, gt, arrayOf } from '../../../src/matchers'

describe('deepEqual assertion', function () {

    let deepEqual

    beforeEach(function () {
        deepEqual = initDeepEqual(assert)
    })

    it('does not throw when actual deep equals expected', function () {

        const actual = {
                a: 1,
                b: 2,
                c: 3,
            },
            expected = {
                a: '1',
                b: 2,
                c: '3',
            }

        deepEqual(actual, expected)
    })

    it('throws when actual does not deep equal expected', function () {

        const actual = {
                a: 1,
                c: 10,
            },
            expected = {
                a: '1',
                b: 5,
            }

        try {

            deepEqual(actual, expected)

            throw new Error('"deepEqual" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepEqual(e.actual, {a: 1, c: 10})
            assert.deepEqual(e.expected, {a: '1', b: 5})
            assert.equal(e.operator, 'deepEqual')
            assert(/ deepEqual /.test(e.message))
        }
    })

    it('able to compare objects with null prototype', function () {

        const actual = Object.create(null, {
                a: {
                    value: 5,
                    enumerable: true
                }
            }),
            expected = { a: 5 }

        deepEqual(actual, expected)

    })

    it('does not throw when equal primitives are compared', function () {

        deepEqual(5, '5')
    })

    it('throws when not equal primitives are compared', function () {

        assert.throws(function () {
            deepEqual(5, 6)
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

        deepEqual(actual, expected)
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

            deepEqual(actual, expected)

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
            assert.equal(e.operator, 'deepEqual')
            assert(/ deepEqual /.test(e.message))

        }
    })

})
