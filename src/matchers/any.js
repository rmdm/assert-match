'use strict'

import StrictMatcher from './strict'

export default class AnyMatcher extends StrictMatcher {

    check (actual) {
        return {
            match: true,
            actual: actual,
            expected: actual,
        }
    }

}
