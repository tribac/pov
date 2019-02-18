var pov = require('../pov');
var assert = require('assert');

describe('basic contract', () => {
    var o = {
        foo: 'bar',
        bar: 'foo'
    };
    var oo = pov(o, {
        oof: 'foo'
    });
    it('can map source', () => {
        assert.equal(oo.oof, o.foo);
    });
    it('can read/write', () => {
        oo.oof = 'baz';
        assert.equal(oo.oof, 'baz');
    });
    it('can change source', () => {
        oo.oof = 'baz';
        assert.equal(o.foo, oo.oof);
    });
    it('can add non-mapped properties (even same name as source)', () => {
        oo.bar = 'oof';
        assert.equal(oo.bar, 'oof');
        assert.equal(oo.source.bar, 'foo');
        assert.equal(o.bar, 'foo');
    });
    it('can not delete mapped properties', () => {
        assert(!(delete oo.oof));
    })
})