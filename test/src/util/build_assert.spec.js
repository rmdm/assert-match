'use strict'

import assert from 'assert'
import buildAssert from '../../../src/util/build_assert'
import matchers from '../../../src/matchers'

describe('build_assert utility', function () {

    let newAssert

    beforeEach(function () {
        newAssert = buildAssert(assert)
    })

    it('returns new assert based on passed one', function () {
        assert.notEqual(newAssert, assert)
        assert(typeof newAssert === 'function')
    })

    it('has "matchers" property', function () {
        assert.equal(newAssert.matchers, matchers)
    })

    it('has "AssertionError" property', function () {
        assert.equal(newAssert.AssertionError, assert.AssertionError)
    })

    var expectedMethods = [
        'deepEqual',
        'deepStrictEqual',
        'doesNotThrow',
        'equal',
        'fail',
        'ifError',
        'notDeepEqual',
        'notDeepStrictEqual',
        'notEqual',
        'notStrictEqual',
        'ok',
        'strictEqual',
        'throws',
    ]

    expectedMethods.forEach(function (methodName) {

        it(`has "${methodName}" method`, function () {
            assert(typeof newAssert[methodName] === 'function')
        })

    })

})
