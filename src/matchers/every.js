'use strict'

import StrictMatcher from './strict'

export default class EveryMatcher extends StrictMatcher {

    match (actual, comparator) {

        if (!Array.isArray(this.expected)) {

            const innerMatcher = new StrictMatcher(this.expected)

            return innerMatcher.match(actual, comparator)
        }

        let notMatched = this.expected.map(function (expected) {

            const innerMatcher = new StrictMatcher(expected)
            const result = innerMatcher.match(actual, comparator)

            return result
        }, this)
        .filter(function (result) {
            return !result.match
        })
        .map(function (result) {
            return result.expected
        })

        if (notMatched.length) {

            return {
                match: false,
                actual: actual,
                expected: { '[every of]': notMatched }
            }
        }

        return {
            match: true,
            actual: actual,
            expected: actual,
        }
    }
}
