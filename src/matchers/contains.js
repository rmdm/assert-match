'use strict'

import StrictMatcher from './strict'

export default class ContainsMatcher extends StrictMatcher {

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

        let match = false

        const expected = actual.map(function (el) {

            const result = this.check(el, comparator)
            match = match || result.match

            return result.match ? result.actual : result.expected
        }, this)

        return {
            match: match,
            actual: actual,
            expected: match ? actual : expected,
        }

    }

}
