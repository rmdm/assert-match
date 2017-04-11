'use strict'

import fallbackAssert from 'core-assert'

export default buildAssertion

function buildAssertion (baseAssert, assertionName, matcher, operatorName) {

    const AssertionError = baseAssert.AssertionError ||
            fallbackAssert.AssertionError

    const comparatorAssertion = typeof baseAssert[assertionName] === 'function'
            ? baseAssert[assertionName].bind(baseAssert)
            : fallbackAssert[assertionName].bind(fallbackAssert)

    const comparator = function (actual, expected) {
        try {
            comparatorAssertion(actual, expected)
            return true
        } catch (e) {
            return false
        }
    }

    return function assertion (actual, expected, message) {

        const result = matcher(expected).match(actual, comparator)

        if (!result.match) {

            throw new AssertionError({
                actual: result.actual,
                expected: result.expected,
                operator: operatorName,
                stackStartFunction: assertion,
                message: message,
            })
        }
    }
}
