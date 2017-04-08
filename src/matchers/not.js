'use strict'

import StrictMatcher from './strict'

export default class NotMatcher extends StrictMatcher {

    constructor (expected) {
        super(expected)
    }

    match (actual, comparator) {

        const result = this.check(actual, comparator)

        let expected = !result.match ? result.actual : { '[not]': result.expected }

        return {
            match: !result.match,
            actual: result.actual,
            expected: expected,
        }
    }

}
