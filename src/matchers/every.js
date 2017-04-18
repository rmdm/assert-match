'use strict'

import StrictMatcher from './strict'

export default class EveryMatcher extends StrictMatcher {

    match (actual, comparator) {

        if (!Array.isArray(this.expected)) {

            const innerMatcher = new StrictMatcher(this.expected)

            return innerMatcher.match(actual, comparator)
        }

        let match = true

        let expected = this.expected.map(function (expected) {

            const innerMatcher = new StrictMatcher(expected)
            const result = innerMatcher.match(actual, comparator)

            match = match && result.match

            return result.match ? result.actual : result.expected
        }, this)

        expected = match ? actual : { '[every of]': expected }

        return {
            match: match,
            actual: actual,
            expected: expected,
        }
    }

}
