'use strict'

import assert from 'assert'
import Type from '../../../src/matchers/type'

describe('type matcher', function () {

    describe('match method', function () {

        it('returns true if a number is of type number', function () {

            const actual = 5, expected = 'number'
            const type = new Type(expected)

            const result = type.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: 5,
                expected: 5,
            })
        })

        it('returns false if a number expected to be of type string', function () {

            const actual = 5, expected = 'string'
            const type = new Type(expected)

            const result = type.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: { '[typeof]': 'string' },
            })
        })

        it('returns false when an object is expected to have primitive type', function () {

            const actual = { a: 5 }, expected = 'number'
            const type = new Type(expected)

            const result = type.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5 },
                expected: { '[typeof]': 'number' },
            })
        })

        it('returns false when a primitive is expected to be an instance of specific class', function () {

            const actual = 5, expected = String
            const type = new Type(expected)

            const result = type.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: { '[typeof]': String },
            })
        })

        it('returns true if an object expected to be an instance of its class', function () {

            const actual = new Number(5), expected = Number
            const type = new Type(expected)

            const result = type.match(actual)

            assert.deepEqual(result, {
                match: true,
                actual: new Number(5),
                expected: new Number(5),
            })
        })

        it('retuns false if an object expected to be an instance of other class', function () {

            const actual = new Number(5), expected = String
            const type = new Type(expected)

            const result = type.match(actual)

            assert.deepEqual(result, {
                match: false,
                actual: new Number(5),
                expected: { '[typeof]': String },
            })
        })

    })

})
