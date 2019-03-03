import pov, { array } from '../src/pov';
import assert from 'assert';

describe('array basic contract', function() {
  const ipa = {
    oof: 1
  };

  // let's encapsulate the use of pov and its mapping
  function mapFoo(source) {
    return pov(source, {
      foo: 'oof'
    });
  }
  const mapped = mapFoo(ipa); // mapped === {foo: 1}

  // now the use of array
  const ipas = {
    soof: [{ oof: 2 }]
  };
  function mapFoos(source) {
    return pov(source, {
      foos: array()('soof', mapFoo)
    });
  }
  const mappeds = mapFoos(ipas);
  it('can read from array', () => {
    assert.equal(mappeds.foos[0].foo, ipas.soof[0].oof); // true
  });

  it('can write to array', () => {
    mappeds.foos[0].foo = 3; // true
    assert.equal(mappeds.foos[0].foo, ipas.soof[0].oof); // still true
  });

  it('can set the whole array', () => {
    mappeds.foos = [{ foo: 4 }];
    assert.equal(mappeds.foos[0].foo, ipas.soof[0].oof); // still true
  });
});
