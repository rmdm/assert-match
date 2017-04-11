'use strict'

import assert from 'assert'
import coreAssert from 'core-assert'
import sinon from 'sinon'
import buildAssertion from '../../../src/util/build_assertion'

describe('buildAssertion utility', function () {

    it('returns matching assertion', function () {

        const assertionName = 'deepEqual'
        const operatorName = 'match'
        const comparator = sinon.stub().returns(true)
        const match = sinon.stub()

        const initMatcher = sinon.stub().returns({
            match: match,
        })

        const assertion = buildAssertion(assert, assertionName, initMatcher, operatorName)

        match.returns({ match: true })

        assertion({a: 1, b: 2}, {a: 1})

        try {

            match.returns({ match: false, expected: { a: 2 }, actual: { a: 1 } })
            comparator.returns(false)

            assertion({a: 1}, {a: 2})

            throw new Error('assertion has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof assert.AssertionError)
            assert.deepEqual(e.actual, {a: 1})
            assert.deepEqual(e.expected, {a: 2})
            assert.equal(e.operator, 'match')
            assert(/ match /.test(e.message)) // { a: 1 } match { a: 2 }
        }

    })

    it('it fallbacks to core-assert when there is no required methods on passed baseAssert', function () {

        const assertionName = 'deepEqual'
        const operatorName = 'match'
        const comparator = sinon.stub().returns(true)
        const match = sinon.stub()

        const initMatcher = sinon.stub().returns({
            match: match,
        })

        const assertion = buildAssertion({}, assertionName, initMatcher, operatorName)

        match.returns({ match: true })

        assertion({a: 1, b: 2}, {a: 1})

        try {

            match.returns({ match: false, expected: { a: 2 }, actual: { a: 1 } })
            comparator.returns(false)

            assertion({a: 1}, {a: 2})

            throw new Error('assertion has unexpectedly not thrown.')
        } catch (e) {

            assert(e instanceof coreAssert.AssertionError)
            assert.deepEqual(e.actual, {a: 1})
            assert.deepEqual(e.expected, {a: 2})
            assert.equal(e.operator, 'match')
            assert(/ match /.test(e.message)) // { a: 1 } match { a: 2 }
        }

    })

})
