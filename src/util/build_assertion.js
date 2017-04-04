'use strict'

import assert from 'assert'
import { loose, strict } from '../matchers'

export default function buildAssertion (name, comparator) {

    return function assertion (actual, expected, message) {

        const matcher = loose(expected)
        const result = matcher.match(actual, comparator)

        if (!result.match) {

            throw new assert.AssertionError({
                actual: result.actual,
                expected: result.expected,
                operator: name,
                stackStartFunction: assertion,
                message: message,
            })
        }
    }
}
