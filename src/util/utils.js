'use strict'

import StrictMatcher from '../matchers/strict'

export default {
    hasOwn,
    isMatcher,
    isObject,
    isStandardObject,
    iterateKeys
}

function hasOwn (obj, key) {
    return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key)
}

function isMatcher (obj) {
    return obj instanceof StrictMatcher
}

function isObject (obj) {
    return obj && typeof obj === 'object'
}

function isStandardObject (obj) {
    return (
        obj instanceof Buffer ||
        obj instanceof ArrayBuffer ||
        obj instanceof Boolean ||
        obj instanceof Date ||
        obj instanceof Number ||
        obj instanceof RegExp ||
        obj instanceof String ||
        isArguments(obj)
    )
}

function isArguments(object) {
    return Object.prototype.toString.call(object) === '[object Arguments]'
}

function iterateKeys () {

    const visited = []

    return function keysIterator (obj, cb) {

        if (!isObject(obj)) {
            return
        }

        if (visited.indexOf(obj) !== -1) {
            return
        }

        visited.push(obj)

        for (let key in obj) {
            cb(key)
        }
    }
}
