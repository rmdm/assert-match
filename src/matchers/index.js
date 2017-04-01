import Loose from './loose'

export default {

    loose: makeMatcher(Loose),

}

function makeMatcher (Ctor) {
    return function (expected) {
        return new Ctor(expected)
    }
}
