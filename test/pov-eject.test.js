var pov = require('../pov');
var assert = require('assert');

describe('can be ejected', function() {
  var d = Object.getOwnPropertyDescriptor;
  var o = {
    foo: 'bar'
  };
  var oo = pov(o, {
    oof: 'foo',
    ooof: {
      get: function(o) {
        return o.foo;
      }
    }
  });
  var o3 = oo.eject();
  it('Object.assign safe', function() {
    assert.deepEqual(Object.assign({}, o3), o3);
  });
  it('exposing same "values"', function() {
    assert.equal(o3.oof, oo.source.foo);
    assert.equal(o3.ooof, oo.source.foo);
  });
  it('exposing values as NON-get/set props', function() {
    assert(d(o3, 'oof') && !d(o3, 'oof')['get']);
    assert(d(o3, 'oof') && !d(o3, 'oof')['set']);
    assert(d(o3, 'ooof') && !d(o3, 'ooof')['get']);
  });
});
