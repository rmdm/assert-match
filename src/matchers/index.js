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
import Regex from './regex'
import Custom from './custom'
import Gt from './gt'
import Gte from './gte'
import Lt from './lt'
import Lte from './lte'

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

matchers.regex = makeMatcher(Regex)

matchers.custom = makeMatcher(Custom)

matchers.gt = makeMatcher(Gt)

matchers.gte = makeMatcher(Gte)

matchers.lt = makeMatcher(Lt)

matchers.lte = makeMatcher(Lte)

function makeMatcher (Ctor) {
    return function wrap (expected) {
        return new Ctor(expected)
    }
}
