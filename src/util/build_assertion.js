'use strict'

import assert from 'assert'
import pickMatching from './pick_matching'

export default function buildAssertion (name, baseAssertion) {

    return function assertion (actual, expected, message) {

        const matched = pickMatching(actual, expected)

        try {
            baseAssertion(matched, expected, message)
        } catch (e) {

            throw new assert.AssertionError({
                actual: matched,
                expected: expected,
                operator: name,
                stackStartFunction: assertion,
            })
        }
    }
}
