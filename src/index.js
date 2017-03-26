'use strict'

import match from './asserts/match'
import strictMatch from './asserts/strict_match'
import notMatch from './asserts/not_match'
import notStrictMatch from './asserts/not_strict_match'

function asserts (obj) {
    obj = obj || {}

    obj.match = match
    obj.notMatch = notMatch
    obj.strictMatch = strictMatch
    obj.notStrictMatch = notStrictMatch

    return obj
}

asserts.match = match
asserts.notMatch = notMatch
asserts.strictMatch = strictMatch
asserts.notStrictMatch = notStrictMatch

export default asserts
export {match, strictMatch, notMatch, notStrictMatch}
