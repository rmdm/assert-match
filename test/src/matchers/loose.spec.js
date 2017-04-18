'use strict'

import assert from 'assert'
import sinon from 'sinon'
import Loose from '../../../src/matchers/loose'

describe('Loose matcher', function () {

    describe('match', function () {

        var loose

        beforeEach(function () {
            loose = new Loose({})
            sinon.stub(loose, 'check')
        })

        it('calls "check" method with passed arguments', function () {
            const actual = { a: 1 }, comparator = (s) => {}

            loose.match(actual, comparator)

            assert(loose.check.calledWithExactly(actual, comparator))
        })

        it('returns result of "check" method', function () {
            const actual = {}

            loose.check.returns({
                actual: actual,
                match: true,
            })

            const result = loose.match({}, () => {})

            assert.deepEqual(result, {
                actual: actual,
                match: true,
            })
        })

    })

    describe('check method', function () {

        var comparator

        beforeEach(function () {
            comparator = sinon.stub()
        })

        it('returns true if actual matches expected', function () {

            const actual = { a: 5, b: 10 }, expected = { a: 5 }
            const loose = new Loose(expected)
            comparator.returns(true)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: 5 }, { a: 5 }))

            assert.deepEqual(result, {
                match: true,
                actual: { a: 5 },
                expected: { a: 5 },
            })
        })

        it('compares equal primitives', function () {

            const actual = 5, expected = 5

            const loose = new Loose(expected)
            comparator.returns(true)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly(5, 5))

            assert.deepEqual(result, {
                match: true,
                actual: 5,
                expected: 5,
            })
        })

        it('compares not equal primitives', function () {

            const actual = 5, expected = 10

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly(5, 10))

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: 10,
            })
        })

        it('compares primitive to object', function () {

            const actual = 5, expected = { a: 5 }

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly(5, { a: 5 }))

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: { a: 5 },
            })
        })

        it('compares object to primitive', function () {

            const actual = { a: 5 }, expected = 5

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: 5 }, 5))

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5 },
                expected: 5,
            })
        })

        it('returns false if actual does not match expected', function () {

            const actual = { a: 5, b: 10 }, expected = { a: 15 }
            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: 5 }, { a: 15 }))

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5 },
                expected: { a: 15 },
            })
        })

        it('compares only with own enumerable properties of expected', function () {

            const actual = {
                    a: 5,
                    b: 7,
                    c: 10,
                },
                expected = Object.create({a: 7}, {
                    'b': {
                        value: 9,
                        enumerable: false,
                    },
                    'c': {
                        value: 11,
                        enumerable: true,
                    }
                })

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ c: 10 }, { c: 11 }))

            assert.deepEqual(result, {
                match: false,
                actual: { c: 10 },
                expected: { c: 11 },
            })
        })

        it('compares actual properties of lesser depth', function () {

            const actual = {
                    a: 1,
                    b: 2,
                },
                expected = { a: { b: { c: 1 } } }

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: 1 },
                    { a: { b: { c: 1 } } }))

            assert.deepEqual(result, {
                match: false,
                actual: { a: 1 },
                expected: { a: { b: { c: 1 } } },
            })
        })

        it('compares actual properties of greater depth', function () {

            const actual = { a: { b: { c: 1 } } },
                expected = { a: 1 }

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: { b: { c: 1 } } },
                    { a: 1 }))

            assert.deepEqual(result, {
                match: false,
                actual: { a: { b: { c: 1 } } },
                expected: { a: 1 },
            })
        })

        it('compares deep array when both actual and expected have it', function () {

            const actual = { a: { b: { c: [ { d: 5 } ] } }, b: 10 },
                expected = { a: { b: { c: [ { d: 10 } ] } } }

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: { b: { c: [ { d: 5 } ] } } },
                    { a: { b: { c: [ { d: 10 } ] } } }))

            assert.deepEqual(result, {
                match: false,
                actual: { a: { b: { c: [ { d: 5 } ] } } },
                expected: { a: { b: { c: [ { d: 10 } ] } } },
            })
        })

        it('calls "match" on instances of Loose on expected and it does match', function () {

            const ten = new Loose()

            sinon.stub(ten, 'match').returns({
                match: true,
                actual: 10,
                expected: 10,
            })

            const actual = { a: 5, b: 10 },
                expected = { a: 5, b: ten }

            const loose = new Loose(expected)
            comparator.returns(true)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: 5 }, { a: 5 }))

            assert.deepEqual(result, {
                match: true,
                actual: { a: 5, b: 10 },
                expected: { a: 5, b: 10 },
            })
        })

        it('calls "match" on instances of Loose on expected and it does not match', function () {

            const ten = new Loose()

            sinon.stub(ten, 'match').returns({
                match: false,
                actual: 11,
                expected: '[ten]',
            })

            const actual = { a: 5, b: 11 },
                expected = { a: 5, b: ten }

            const loose = new Loose(expected)
            comparator.returns(true)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: 5 }, { a: 5 }))

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5, b: 11 },
                expected: { a: 5, b: '[ten]' },
            })
        })

        it('calls "match" on instances of Loose on expected and it does match but other props are not', function () {

            const ten = new Loose()

            sinon.stub(ten, 'match').returns({
                match: true,
                actual: 10,
                expected: 10,
            })

            const actual = { a: 5, b: 10 },
                expected = { a: 6, b: ten }

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: 5 }, { a: 6 }))

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5, b: 10 },
                expected: { a: 6, b: 10 },
            })
        })

        it('calls "match" on instances of Loose on expected and it does not match neiter other props do',
                    function () {

            const ten = new Loose()

            sinon.stub(ten, 'match').returns({
                match: false,
                actual: 11,
                expected: '[ten]',
            })

            const actual = { a: 5, b: 11 },
                expected = { a: 6, b: ten }

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly({ a: 5 }, { a: 6 }))

            assert.deepEqual(result, {
                match: false,
                actual: { a: 5, b: 11 },
                expected: { a: 6, b: '[ten]' },
            })
        })

        it('calls "match" instance of Loose if it is top-level exact', function () {

            const ten = new Loose()

            sinon.stub(ten, 'match').returns({
                match: true,
                actual: 10,
                expected: 10,
            })

            const actual = 10,
                expected = ten

            const loose = new Loose(expected)
            comparator.returns(true)

            const result = loose.check(actual, comparator)

            assert.deepEqual(result, {
                match: true,
                actual: 10,
                expected: 10,
            })
        })

        it('compares primitive to object with matcher', function () {

            const ten = new Loose()

            sinon.stub(ten, 'match').returns({
                match: false,
                actual: undefined,
                expected: '[ten]',
            })

            const actual = 10, expected = { a: ten }

            const loose = new Loose(expected)
            comparator.returns(false)

            const result = loose.check(actual, comparator)

            assert(comparator.calledWithExactly(10, {}))

            assert.deepEqual(result, {
                match: false,
                actual: 10,
                expected: { a: '[ten]' },
            })
        })

    })

})
