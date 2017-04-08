'use strict'

import Loose from './loose'
import Strict from './strict'
import Any from './any'
import Not from './not'

const matchers = {}

export default matchers

matchers.strict = makeMatcher(Strict)
matchers.loose = makeMatcher(Loose)

matchers.any = matchers.anything = makeMatcher(Any)

matchers.not = makeMatcher(Not)

function makeMatcher (Ctor) {
    return function (expected) {
        return new Ctor(expected)
    }
}
