'use strict'

import assert from 'assert'
import sinon from 'sinon'
import buildAssertion from '../../../src/util/build_assertion'

describe('buildAssertion utility', function () {

    it('returns matching assertion', function () {

        const name = 'match'
        const comparator = sinon.stub().returns(true)

        const assertion = buildAssertion(name, comparator)

        assertion({a: 1, b: 2}, {a: 1})

        try {

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

})
