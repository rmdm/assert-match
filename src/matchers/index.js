'use strict'

import Loose from './loose'
import Strict from './strict'
import Any from './any'
import Not from './not'
import Type from './type'
import Primitive from './primitive'
import ArrayOf from './array_of'

const matchers = {}

export default matchers

matchers.strict = makeMatcher(Strict)
matchers.loose = makeMatcher(Loose)

matchers.any = matchers.anything = makeMatcher(Any)

matchers.not = makeMatcher(Not)

matchers.type = makeMatcher(Type)

matchers.primitive = makeMatcher(Primitive)

matchers.arrayOf = makeMatcher()

function makeMatcher (Ctor) {
    return function wrap (expected) {
        try {
            return new Ctor(expected)
        } catch (e) {
            Error.captureStackTrace(e, wrap)
            throw e
        }
    }
}
