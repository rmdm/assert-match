'use strict'

import assert from '../../src'
import {
    strict,
    loose,
    any,
    not,
    type,
    primitive,
    arrayOf,
    every,
    some,
    regex,
    custom,
    gt,
    gte,
    lt,
    lte,
    contains
} from '../../src/matchers'

describe('random tests', function () {

    describe('from README', function () {

        it('short example', function () {

            const actual = {
                    str: 'abc',
                    obj: { b: 1, c: 2 },
                    nums: [ 1, 2, 'x' ],
                },
                expected = {
                    str: 'abc',
                    obj: loose({ b: 1 }),
                    nums: arrayOf(type('number')),
                }

            assert.throws(function () {
                assert.deepEqual(actual, expected)
            })
        })

        it('matchers examples', function () {

            assert.deepEqual({ a: 1, b: 2 }, strict({ a: 1, b: 2 }))
            assert.throws(function () { assert.deepEqual({ a: 1, b: 2 }, strict({ a: 1 })) })
            assert.throws(function () { assert.deepEqual({ a: 1 }, strict({ a: 1, b: 2 })) })


            assert.deepEqual({ a: 1, b: 2 }, loose({ a: 1, b: 2 }))
            assert.deepEqual({ a: 1, b: 2 }, loose({ a: 1 }))
            assert.throws(function () { assert.deepEqual({ a: 1 }, loose({ a: 1, b: 2 })) })


            assert.deepEqual(undefined, any())
            assert.deepEqual({ a: 1, b: 2, c: 3}, { a: 1, b: 2, c: any() })
            assert.throws(function () { assert.deepEqual({ a: 1, b: 2, c: 3}, { a: 1, b: 5, c: any() }) })


            assert.throws(function () { assert.deepEqual({ a: 1, b: 2 }, not({ a: 1, b: 2 })) })
            assert.deepEqual({ a: 1, b: 2 }, not({ a: 1 }))
            assert.deepEqual({ a: 1 }, not({ a: 1, b: 2 }))


            assert.deepEqual({ a: 1, b: 2 }, every([loose({ a: 1 }), loose({ b: 2 })]))
            assert.throws(function () { assert.deepEqual({ a: 1, b: 2 }, every([loose({ a: 1 }), loose({ c: 3 })])) })
            assert.throws(function () { assert.deepEqual({ a: 1, b: 2 }, every([ { c: 3 } ])) })
            assert.deepEqual({ a: 1, b: 2 }, every(loose({ a: 1 })))


            assert.deepEqual({ a: 1, b: 2 }, some([loose({ a: 1 }), loose({ b: 2 })]))
            assert.deepEqual({ a: 1, b: 2 }, some([loose({ a: 1 }), loose({ c: 3 })]))
            assert.throws(function () { assert.deepEqual({ a: 1, b: 2 }, some([ { c: 3 } ])) })
            assert.deepEqual({ a: 1, b: 2 }, some(loose({ a: 1 })))


            assert.deepEqual([1, 1, 1], arrayOf(1))
            assert.throws(function () { assert.deepEqual([1, 1, 'a'], arrayOf(1)) })
            assert.throws(function () { assert.deepEqual(1, arrayOf(1)) })


            assert.deepEqual([ 1, 1, 1 ], contains(1))
            assert.deepEqual([ 1, 'a', 'a' ], contains(1))
            assert.throws(function () { assert.deepEqual([ 'a', 'a', 'a' ], contains(1)) })
            assert.throws(function () { assert.deepEqual(1, contains(1)) })


            assert.deepEqual(5, type('number'))
            assert.deepEqual([ 1, 2, 3 ], type(Array))
            assert.throws(function () { assert.deepEqual(5, type('string')) })
            assert.throws(function () { assert.deepEqual({ a: 1 }, type({ a: 1 })) })


            assert.deepEqual({}, primitive('[object Object]'))
            assert.deepEqual(new String('abc'), primitive('abc'))
            assert.deepEqual({ toString: () => 'abc' }, primitive('abc'))
            assert.deepEqual(1, primitive(1))
            assert.throws(function () { assert.deepEqual(10, primitive(1)) })


            assert.deepEqual('abc', regex('^a'))
            assert.deepEqual('[object Object]', regex({}))
            assert.deepEqual('123', regex(/^\d+$/))
            assert.throws(function () { assert.deepEqual('123', regex('^\D+$')) })


            assert.deepEqual('b', gt('a'))
            assert.throws(function () { assert.deepEqual('a', gt('b')) })
            assert.deepEqual(1, gt(0))
            assert.throws(function () { assert.deepEqual(0, gt(0)) })
            assert.deepEqual([1, 2, 3], loose({ length: gt(1) }))
            assert.throws(function () { assert.deepEqual([1], loose({ length: gt(1) })) })


            assert.deepEqual('b', gte('a'))
            assert.throws(function () { assert.deepEqual('a', gte('b')) })
            assert.deepEqual(1, gte(0))
            assert.deepEqual(0, gte(0))
            assert.deepEqual([1, 2, 3], loose({ length: gte(1) }))
            assert.deepEqual([1], loose({ length: gte(1) }))


            assert.deepEqual('a', lt('b'))
            assert.throws(function () { assert.deepEqual('b', lt('a')) })
            assert.deepEqual(0, lt(1))
            assert.throws(function () { assert.deepEqual(0, lt(0)) })
            assert.throws(function () { assert.deepEqual([1, 2, 3], loose({ length: lt(1) })) })
            assert.throws(function () { assert.deepEqual([1], loose({ length: lt(1) })) })


            assert.deepEqual('a', lte('b'))
            assert.throws(function () { assert.deepEqual('b', lte('a')) })
            assert.deepEqual(0, lte(1))
            assert.deepEqual(0, lte(0))
            assert.throws(function () { assert.deepEqual([1, 2, 3], loose({ length: lte(1) })) })
            assert.deepEqual([1], loose({ length: lte(1) }))



            assert.deepEqual({ a: 1 }, custom( actual => actual.a === 1) )
            assert.throws(function () { assert.deepEqual({ a: 1 }, custom( actual => actual.a !== 1) ) })
            assert.deepEqual({ a: 1 }, custom( actual => ({
                match: actual.a === 1,
                actual: 1,
            }) ))
            assert.throws(function () {
                assert.deepEqual({ a: 1 }, custom( actual => ({
                    match: actual.a !== 1,
                    actual: '["a" should not be equal to 1]',
                }) ))
            })
            assert.deepEqual([1, 1, 1], custom(
                (actual, comparator) => arrayOf(gt(0)).match(actual, comparator)
            ))
            assert.throws(function () {
                assert.deepEqual([1, 1, 'a'], custom(
                    (actual, comparator) => arrayOf(1).match(actual, comparator)
                ))
            })

        })
    })
})
