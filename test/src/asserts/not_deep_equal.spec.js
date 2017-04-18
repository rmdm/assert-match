'use strict'

import assert from 'assert'
import initNotDeepEqual from '../../../src/asserts/not_deep_equal'
import { loose, type, gt, arrayOf } from '../../../src/matchers'

describe('notDeepEqual assertion', function () {

    let notDeepEqual

    beforeEach(function () {
        notDeepEqual = initNotDeepEqual(assert)
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

        notDeepEqual(actual, expected)
    })

    it('throws when actual deep equals expected', function () {

        const actual = {
                a: 1,
                c: 10,
            },
            expected = {
                a: '1',
                c: 10,
            }

        try {

            notDeepEqual(actual, expected)

            throw new Error('"notDeepEqual" has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepEqual(e.actual, { a: 1, c: 10 })
            assert.deepEqual(e.expected, { '[not]': { a: '1', c: 10 }})
            assert.equal(e.operator, 'notDeepEqual')
            assert(/ notDeepEqual /.test(e.message))
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

        notDeepEqual(actual, expected)

    })

    it('does not throw when not equal primitives are compared', function () {

        notDeepEqual(5, 7)
    })

    it('throws when equal primitives are compared', function () {

        assert.throws(function () {
            notDeepEqual(5, 5)
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

        notDeepEqual(actual, expected)
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

            notDeepEqual(actual, expected)

            throw new Error('"notDeepEqual" has unexpectedly not thrown.')
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
            assert.equal(e.operator, 'notDeepEqual')
            assert(/ notDeepEqual /.test(e.message))

        }
    })

})
