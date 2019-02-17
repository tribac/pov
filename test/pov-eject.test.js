var pov = require('../pov');
var assert = require('assert');

describe('can be ejected', () => {
  var d = Object.getOwnPropertyDescriptor;
  var o = {
    foo: 'bar'
  };
  var oo = pov(o, {
    oof: 'foo',
    ooof: {
      'get': function (o) {
        return o.foo
      }
    }
  });
  var ooo = oo.eject();
  it('Object.assign safe', () => {
    assert.deepEqual(Object.assign({}, ooo), ooo);
  });
  it('exposing same "values"', () => {
    assert.equal(ooo.oof, oo.source.foo);
    assert.equal(ooo.ooof, oo.source.foo);
  });
  it('exposing values as NON-get/set props', () => {
    assert(d(ooo, 'oof') && !d(ooo, 'oof')['get']);
    assert(d(ooo, 'oof') && !d(ooo, 'oof')['set']);
    assert(d(ooo, 'ooof') && !d(ooo, 'ooof')['get']);
  })
});