var pov = require('../pov');
var assert = require('assert');

describe('basic contract', function() {
  var o = {
    foo: 'bar',
    bar: 'foo'
  };
  var oo = pov(o, {
    oof: 'foo'
  });
  it('can map source', function() {
    assert.equal(oo.oof, o.foo);
  });
  it('can read/write', function() {
    oo.oof = 'baz';
    assert.equal(oo.oof, 'baz');
  });
  it('can change source', function() {
    oo.oof = 'baz';
    assert.equal(o.foo, oo.oof);
  });
  it('can add non-mapped properties (even same name as source)', function() {
    oo.bar = 'oof';
    assert.equal(oo.bar, 'oof');
    assert.equal(oo.source.bar, 'foo');
    assert.equal(o.bar, 'foo');
  });
  it('can not delete mapped properties', function() {
    assert(!delete oo.oof);
  });
});
