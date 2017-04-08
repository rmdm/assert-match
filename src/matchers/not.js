'use strict'

import StrictMatcher from './strict'

export default class NotMatcher extends StrictMatcher {

    constructor (expected) {
        super(expected)
    }

    match (actual, comparator) {

        const result = this.check(actual, comparator)

        return {
            match: !result.match,
            actual: result.actual,
            expected: { not: result.expected },
        }
    }

}
