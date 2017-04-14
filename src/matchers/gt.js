'use strict'

import StrictMatcher from './strict'

export default class GtMatcher extends StrictMatcher {

    match (actual) {

        const match = actual > this.expected

        const expected = match ? actual : { '[greater than]': this.expected }

        return {
            match: match,
            actual: actual,
            expected: expected,
        }
    }

}
