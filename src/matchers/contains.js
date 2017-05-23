'use strict'

import StrictMatcher from './strict'

export default class ContainsMatcher extends StrictMatcher {

    constructor (... expected) {
        super(expected)
    }

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

        const notContained = this.expected
        .filter(function (expected) {

            return !actual.some(function (el) {

                const elMatcher = new StrictMatcher(expected)

                const result = elMatcher.match(el, comparator)

                return result.match
            }, this)
        }, this)
        .map(function (expected) {

            const elMatcher = new StrictMatcher(expected)

            // use any element of actual array to get expected value of not contained
            const result = elMatcher.match(actual[0], comparator)

            return result.expected
        }, this)

        if (notContained.length) {

            return {
                match: false,
                actual: actual,
                expected: {
                    '[to contain]': notContained,
                }
            }
        }

        return {
            match: true,
            actual: actual,
            expected: actual,
        }
    }
}
