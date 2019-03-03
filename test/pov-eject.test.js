import pov from '../src/pov';
import assert from 'assert';

describe('can be ejected', function() {
  const d = Object.getOwnPropertyDescriptor;
  const o = {
    foo: 'bar'
  };
  const oo = pov(o, {
    oof: 'foo',
    ooof: {
      get: function(o) {
        return o.foo;
      }
    }
  });
  const o3 = oo.eject();
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
