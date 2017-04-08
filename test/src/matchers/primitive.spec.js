'use strict'

import assert from 'assert'
import sinon from 'sinon'
import Primitive from '../../../src/matchers/primitive'

describe('primitive matcher', function () {

    let comparator

    beforeEach(function () {
        comparator = sinon.stub()
    })

    describe('match method', function () {

        it('returns true if actual number object equals primitive number', function () {

            const actual = new Number(5), expected = 5
            const primitive = new Primitive(expected)

            comparator.returns(true)

            const result = primitive.match(actual, comparator)

            assert.deepEqual(result, {
                match: true,
                actual: new Number(5),
                expected: new Number(5),
            })
        })

        it('returns false if actual number object is not equal to primitive number', function () {

            const actual = new Number(5), expected = 10
            const primitive = new Primitive(expected)

            comparator.returns(false)

            const result = primitive.match(actual, comparator)

            assert.deepEqual(result, {
                match: false,
                actual: new Number(5),
                expected: 10,
            })
        })

        it('returns true when when two plain object are compared', function () {

            const actual = { a: 5 }, expected = { b: 10 }
            const primitive = new Primitive(expected)

            comparator.returns(true)

            const result = primitive.match(actual, comparator)

            assert.deepEqual(result, {
                match: true,
                actual: { a: 5 },
                expected: { a: 5 },
            })
        })

        it('returns false when something unprimitivable is compared', function () {

            const actual = {
                valueOf: () => { return {} },
                toString: () => { return {} },
            }
            const expected = 5
            const primitive = new Primitive(expected)

            const result = primitive.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: '[unprimitivable]',
                expected: 5,
            })
        })

        it('returns false when something is compared with unprimitivable', function () {

            const actual = 5
            const expected = {
                valueOf: () => { return {} },
                toString: () => { return {} },
            }
            const primitive = new Primitive(expected)

            const result = primitive.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: '[unprimitivable]',
            })
        })

    })

})
