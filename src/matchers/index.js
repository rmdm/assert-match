'use strict'

import Loose from './loose'
import Strict from './strict'
import Any from './any'
import Not from './not'
import Type from './type'
import Primitive from './primitive'
import ArrayOf from './array_of'
import Every from './every'
import Some from './some'
import Custom from './custom'

const matchers = {}

export default matchers

matchers.strict = makeMatcher(Strict)

matchers.loose = makeMatcher(Loose)

matchers.any = makeMatcher(Any)

matchers.not = makeMatcher(Not)

matchers.type = makeMatcher(Type)

matchers.primitive = makeMatcher(Primitive)

matchers.arrayOf = makeMatcher(ArrayOf)

matchers.every = makeMatcher(Every)

matchers.some = makeMatcher(Some)

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
