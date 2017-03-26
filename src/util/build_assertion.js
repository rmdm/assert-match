'use strict'

import assert from 'assert'
import pickMatching from './pick_matching'

export default function buildAssertion (name, comparator) {

    return function (actual, expected, message) {

        const matched = pickMatching(actual, expected)

        try {
            comparator(matched, expected, message)
        } catch (e) {

            throw new assert.AssertionError({
                actual: matched,
                expected: expected,
                operator: name,
            })
        }
    }
}
