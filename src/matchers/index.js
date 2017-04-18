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
import Contains from './contains'

const matchers = {}

export default matchers

defineMatcher(matchers, 'strict', Strict)

defineMatcher(matchers, 'loose', Loose)

defineMatcher(matchers, 'any', Any)

defineMatcher(matchers, 'not', Not)

defineMatcher(matchers, 'type', Type)

defineMatcher(matchers, 'primitive', Primitive)

defineMatcher(matchers, 'arrayOf', ArrayOf)

defineMatcher(matchers, 'every', Every)

defineMatcher(matchers, 'some', Some)

defineMatcher(matchers, 'regex', Regex)

defineMatcher(matchers, 'custom', Custom)

defineMatcher(matchers, 'gt', Gt)

defineMatcher(matchers, 'gte', Gte)

defineMatcher(matchers, 'lt', Lt)

defineMatcher(matchers, 'lte', Lte)

defineMatcher(matchers, 'contains', Contains)

function defineMatcher (matchers, name, Ctor) {
    Object.defineProperty(matchers, name, {
        value: function matcher (expected) {
            return new Ctor(expected)
        },
    })
}
