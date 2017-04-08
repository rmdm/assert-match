'use strict'

import StrictMatcher from './strict'

export default class AnyMatcher extends StrictMatcher {

    constructor (expected) {
        super()
    }

    check (actual, comparator) {
        return {
            match: true,
            actual: actual,
            expected: actual,
        }
    }

}
