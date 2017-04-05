'use strict'

import Loose from './loose'
import Strict from './strict'

export default {

    loose: makeMatcher(Loose),
    strict: makeMatcher(Strict),

}

function makeMatcher (Ctor) {
    return function (expected) {
        return new Ctor(expected)
    }
}
