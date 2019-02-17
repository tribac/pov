var pov = require('../pov');
var assert = require('assert');

describe('can be ejected', () => {
  var d = Object.getOwnPropertyDescriptor;
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
  var other = vop.eject();
  it('Object.assign safe', () => {
    assert.deepEqual(Object.assign({}, other), other);
  });
  it('exposing same "values"', () => {
    assert.equal(other.oof, vop.source.foo);
    assert.equal(other.ooof, vop.source.foo);
  });
  it('exposing values as NON-get/set props', () => {
    assert(d(other, 'oof') && !d(other, 'oof')['get']);
    assert(d(other, 'oof') && !d(other, 'oof')['set']);
    assert(d(other, 'ooof') && !d(other, 'ooof')['get']);
  })
});