var pov = require('../pov');
var assert = require('assert');

describe('can be copied from another point-of-view', () => {
  var source = {
    foo: 'bar'
  };
  var vop = pov(source, {
    oof: 'foo',
    ooof: {
      'get': function (o) {
        return o.foo
      }
    }
  });
  it('no other point-of-view does nothing', () => {
    vop.copy();
    assert.equal(vop.oof, 'bar');
  });
  it('null other point-of-view does nothing', () => {
    vop.copy(null);
    assert.equal(vop.oof, 'bar');
  });
  it('empty other point-of-view does nothing', () => {
    vop.copy({});
    assert.equal(vop.oof, 'bar');
  });
  it('non-matching properties in other point-of-view does nothing', () => {
    vop.copy({
      bar: 'foo'
    });
    assert.equal(vop.oof, 'bar');
  });
});