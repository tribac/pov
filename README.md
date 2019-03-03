# pov

Point-of-view, everybody's got one!

Say you work in the presentation layer and the business concepts that make sense to you are `foo` and `bar`, this is your `point-of-view`.

However, you need to access/mutate these concepts through an API which exposes them as `oof` and `rab`.

The obvious solution is to use mappers to transform from one to the other for both read & write, but let's try another approach, that of having a `live` point-of-view.

```
const ipa = api.fetch();
// ipa === {oof: 1, rab: 2}

const my_concepts = my_point_of_view(ipa);
// my_concepts === {foo: 1, bar: 2}
```

Now we can both read & write `oof` as `foo`:

```
my_concepts.foo === ipa.oof; // true

my_concepts.foo = -1;

my_concepts.foo === ipa.oof; // still true
```

We need to provide some kind of mapping information to associate `foo` with `oof`, and `bar` with `rab`:

```
const my_mapping = {foo: 'oof', bar: 'rab'};
const my_concepts = my_point_of_view(ipa, my_mapping);
```

We don't just need to rename concepts but often times also apply some transformation(s) to fit our `point-of-view`.

For example API also returns a date of birth `1980-01-01T01:01:01.001Z` that we want to use without the time part `1980-01-01`.

So instead of only providing the name of the source concept (as `oof` for `foo`), our maping should define functions to `get` & `set` our concept:

```
const mapping = {
  foo: 'oof',
  bar: 'rab',
  birth: {
    get: (_ipa) =>
      _ipa.birth.toISOString().slice(0, 10),
    set: (_ipa, _date) => {
      _ipa.birth = new Date(_date);
      }
  }
}
```

We can use these mapping functions to perform more complex transformations, including aggregation of concepts and accessing nested levels of concepts.

Since it is a common requirement, an `array` mapping with `get` & `set` functions is provided out-of-the-box. Here is a real example of use of `pov`:

```
import pov, {array} from 'povjs';

const ipa = {
  oof: 1
}

// let's encapsulate the use of pov and its mapping
function mapFoo(source) {
  return pov(source, {
    foo: 'oof'
  });
}
const mapped = mapFoo(ipa); // mapped === {foo: 1}

// now the use of array
const ipas = {
  soof: [
    {oof: 2}
  ]
}
function mapFoos(source) {
  return pov(source, {
    foos: array()('soof', mapFoo)
  })
}
const mappeds = mapFoos(ipas);
mappeds.foos[0].foo === ipas.soof[0].oof; // true

mappeds.foos[0].foo = 3; // true
mappeds.foos[0].foo === ipas.soof[0].oof; // still true

mappeds.foos = [{foo: 4}];
mappeds.foos[0].foo === ipas.soof[0].oof; // still true
```

All good, but why `array()(...)`?

Because `array` is a currying function which may accept two parameters, respectively `getter` and `setter`, both functions to provide pluggable extensions to the read & write abilities.

As a matter of fact, `pov` is also a currying function which also accepts the same number of parameters but for convenience, is exposed pre-configured with defaults.

```
import pov, {pov as currying_pov} from 'povjs';
```

Here `currying_pov()` and `pov` will be equivalent.

With these extension points, we can provide custom getter & setter as `interceptors`, for example:

```
import {pov as currying_pov, getter, setter} from 'povjs';

// decorate default getter & setter with...
function _getter(source, path) {
  console.log('getter', {path});
  return getter(source, path)
}
function _setter(source, path, value) {
  console.log('setter', {path, value});
  setter(source, path, value);
}
const pov = currying_pov(_getter, _setter)(...);
```

Another example would be to provide custom `getter` & `setter` to support nested properties:

```
const ipa = {
  oof: {
    rab: 1
  }
}
const mapped = pov(ipa,
  {
    bar: 'oof.rab'
  }
);
```

This nested path access is such a common requirement, but to avoid reinventing the wheel, a `povjs` sister project `povjs-lodash` will provide these functionalities, along with its dependencies to a minimal required subset of the excellent `lodash` library.
