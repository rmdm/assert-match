'use strict'

import assert from 'core-assert'

export default function buildAssertion (baseAssert, name, matcher, comparator) {

    let AssertionError = baseAssert.AssertionError ||
            assert.AssertionError

    return function assertion (actual, expected, message) {

        const result = matcher(expected).match(actual, comparator)

        if (!result.match) {

            throw new AssertionError({
                actual: result.actual,
                expected: result.expected,
                operator: name,
                stackStartFunction: assertion,
                message: message,
            })
        }
    }
}
