'use strict'

import assert from 'assert'
import pickMatching from '../../../src/util/pick_matching'

describe('pickMatching utility', function () {

    it('returns first argument if the second one is not an object', function () {

        const first = {}, second = null

        const result = pickMatching(first, second)

        assert.equal(result, first)
    })

    it('returns null if first argument is not an object and the second one is object', function () {

        const first = 5, second = {}

        const result = pickMatching(first, second)

        assert.strictEqual(result, null)
    })

    it('returns first argument if both arguements are not objects', function () {

        const first = 5, second = 10

        const result = pickMatching(first, second)

        assert.strictEqual(result, 5)
    })

    it('returns object with properties matching own enumerable properties of the second one', function () {

        const first = {
                a: 5,
                b: 7,
                c: 10,
            },
            second = Object.create({a: 7}, {
                'b': {
                    value: 9,
                    enumerable: false,
                },
                'c': {
                    value: 11,
                    enumerable: true,
                }
            })

        const result = pickMatching(first, second)

        assert.deepStrictEqual(result, {c: 10})
    })

    it('returns object when mathing object has deeper props', function () {

        const first = {
                a: 1,
            },
            second = {
                a: {
                    b: {
                        c: 1,
                    }
                }
            }

        const result = pickMatching(first, second)

        assert.deepStrictEqual(result, {a: 1})
    })

    it('returns object when mathing object has less deep props', function () {

        const first = {
                a: {
                    b: {
                        c: 1,
                    }
                }
            },
            second = {
                a: 1,
            }

        const result = pickMatching(first, second)

        assert.deepStrictEqual(result, {a: {b: {c: 1}}})
    })

    it('returns object with deep array, when both objects has it', function () {

        const first = {
                a: {
                    b: {
                        c: [ { d: 5 } ],
                    }
                }
            },
            second = {
                a: {
                    b: {
                        c: [ { d: 10 } ],
                    }
                }
            }

        const result = pickMatching(first, second)

        assert.deepStrictEqual(result, {a: {b: {c: [ { d: 5 } ]}}})

    })

})
