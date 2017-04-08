'use strict'

import assert from 'assert'
import sinon from 'sinon'
import Not from '../../../src/matchers/not'

describe('not matcher', function () {

    let comparator

    before(function () {
        sinon.stub(Not.prototype, 'check')
        comparator = sinon.stub()
    })

    describe('match method', function () {

        it('returns true if check returns false', function () {

            const actual = 5, expected = 10
            Not.prototype.check.returns({
                match: false,
                actual: 5,
                expected: 10,
            })
            const not = new Not(expected)

            const result = not.match(actual, comparator)

            assert(Not.prototype.check.calledWithExactly(actual, comparator))

            assert.deepEqual(result, {
                match: true,
                actual: 5,
                expected: 5,
            })
        })

        it('returns false if check returns true', function () {

            const actual = 5, expected = 5
            Not.prototype.check.returns({
                match: true,
                actual: 5,
                expected: 5,
            })
            const not = new Not(expected)

            const result = not.match(actual, comparator)

            assert(Not.prototype.check.calledWithExactly(actual, comparator))

            assert.deepEqual(result, {
                match: false,
                actual: 5,
                expected: { '[not]': 5 },
            })
        })

    })

})
