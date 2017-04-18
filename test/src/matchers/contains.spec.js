'use strict'

import assert from 'assert'
import sinon from 'sinon'
import Contains from '../../../src/matchers/contains'

describe('contains matcher', function () {

    let comparator

    beforeEach(function () {
        comparator = sinon.stub().returns(true)
    })

    describe('match method', function () {

         it('returns false if not array is matched', function () {

            const actual = { a: 5 }, expected = 5
            const arrayOf = new Contains(expected)

            const result = arrayOf.match(actual, comparator)

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5 },
                expected: '[an Array]',
            })
        })

        it('returns false if array is empty', function () {

            const actual = [], expected = 5
            const arrayOf = new Contains(expected)

            const result = arrayOf.match(actual, comparator)

            assert.deepEqual(result, {
                match: false,
                actual: [],
                expected: '[not an empty Array]',
            })
        })

        it('returns true if all elements of array match expected', function () {

            const actual = [5, 5, 5, 5], expected = 5
            const arrayOf = new Contains(expected)

            const result = arrayOf.match(actual, comparator)

            assert.deepEqual(result, {
                match: true,
                actual: [5, 5, 5, 5],
                expected: [5, 5, 5, 5],
            })
        })

        it('returns true if some elements of array match expected', function () {

            const actual = [10, 10, 10, 5], expected = 5
            const arrayOf = new Contains(expected)

            const result = arrayOf.match(actual, (a, b) => a === b)

            assert.deepEqual(result, {
                match: true,
                actual: [10, 10, 10, 5],
                expected: [10, 10, 10, 5],
            })
        })

        it('returns false if no elements of array match expected', function () {

            const actual = [1, 2, 3, 4], expected = 5
            const arrayOf = new Contains(expected)

            const result = arrayOf.match(actual, (a, b) => a === b)

            assert.deepEqual(result, {
                match: false,
                actual: [1, 2, 3, 4],
                expected: [5, 5, 5, 5],
            })
        })

    })

})
