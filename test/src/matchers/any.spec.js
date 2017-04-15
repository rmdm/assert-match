'use strict'

import assert from 'assert'
import Any from '../../../src/matchers/any'

describe('any matcher', function () {

    describe('check method', function () {

        // returns true for everything

        const valuesToCheck = [
            false,
            null,
            undefined,
            0,
            -1,
            true,
            5,
            '',
            'abc',
            '4',
            /abc/,
            /abc/g,
            Symbol('symbol'),
            new Date(0),
            {},
            [1, 3, 5],
            [{}],
        ]

        valuesToCheck.forEach(function (value) {

            it(`returns true for ${stringify(value)}`, function () {

                const any = new Any(value)

                const result = any.check(value)

                assert.deepEqual(result, {
                    match: true,
                    actual: value,
                    expected: value,
                })
            })
        })

    })

})

function stringify (value) {

    if (typeof value === 'symbol') {
        return value.toString()
    }

    return String(value)
}
