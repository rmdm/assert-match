'use strict'

import StrictMatch from './strict'

export default class ArrayOfMatcher extends StrictMatch {

    match (actual, comparator) {

        if (!Array.isArray(actual)) {

            return {
                match: false,
                actual: actual,
                expected: '[an Array]',
            }
        }

        if (!actual.length) {

            return {
                match: false,
                actual: actual,
                expected: '[not an empty Array]',
            }
        }

        let match = true

        const expected = actual.map(function (el) {

            const result = this.check(el, comparator)
            match = match && result.match

            return result.match ? result.actual : result.expected
        }, this)

        return {
            match: match,
            actual: actual,
            expected: expected,
        }
    }

}
