'use strict'

import StrictMatcher from './strict'

export default class SomeMatcher extends StrictMatcher {

    match (actual, comparator) {

        if (!Array.isArray(this.expected)) {

            const innerMatcher = new StrictMatcher(this.expected)

            return innerMatcher.match(actual, comparator)
        }

        let match = false

        let expected = this.expected.map(function (expected) {

            const innerMatcher = new StrictMatcher(expected)
            const result = innerMatcher.match(actual, comparator)

            match = match || result.match

            return result.match ? result.actual : result.expected
        }, this)

        expected = match ? actual : { '[some of]': expected }

        return {
            match: match,
            actual: actual,
            expected: expected,
        }
    }

}
