'use strict'

import asserts from '../asserts'
import matchers from '../matchers'

var methods = [
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

export default function buildAssert (baseAssert) {

    const assert = makeAssertion(asserts, baseAssert, 'ok')

    for (let methodName of methods) {
        assert[methodName] = makeAssertion(asserts, baseAssert, methodName)
    }

    assert.matchers = matchers
    assert.AssertionError = baseAssert.AssertionError

    return assert
}

function makeAssertion (asserts, baseAssert, methodName) {

    let assertion
    let initAssertion = asserts[methodName]

    if (initAssertion) {
        assertion = initAssertion(baseAssert)
    } else {
        assertion = baseAssert[methodName].bind(baseAssert)
    }

    return function assertionProxy () {
        try {
            return assertion.apply(null, arguments)
        } catch (e) {
            if (typeof Error.captureStackTrace === 'function') {
                Error.captureStackTrace(e, assertionProxy)
            }
            throw e
        }
    }
}
