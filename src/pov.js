const getter = (o, field) => o[field];

const setter = (o, field, v) => {
  o[field] = v;
};

const array = (_get = getter, _set = setter) => (
  field,
  mapper = unmapped => unmapped
) => {
  let _mapped = null;
  return {
    get: o => {
      if (_mapped) return _mapped;
      _mapped = (_get(o, field) || []).map(unmapped => mapper(unmapped));
      return _mapped;
    },
    set: (o, v) => {
      _mapped = [];
      _set(
        o,
        field,
        v.map(mapped => {
          const unmapped = {};
          const newMapped = mapper(unmapped);
          newMapped.inject(mapped);
          _mapped.push(newMapped);
          return unmapped;
        })
      );
    }
  };
};

const pov = (_get = getter, _set = setter) => (
  source = {},
  mapping = {},
  options = {}
) => {
  function clone() {
    return pov(_get, _set)(source, mapping);
  }

  function inject(from) {
    from = from || {};
    Object.keys(from).forEach(key => {
      key in mapping && _set(this, key, _get(from, key));
    });
    return result;
  }

  function eject() {
    return Object.keys(mapping).reduce((ejectable, key) => {
      _set(ejectable, key, _get(this, key));
      return ejectable;
    }, {});
  }

  const result = {
    array: array(_get, _set),
    clone,
    inject,
    eject,
    get source() {
      return Object.assign({}, source);
    }
  };

  function addGetterSetter(name, select) {
    if (select) {
      Object.defineProperty(result, name, {
        configurable: false,
        enumerable: true,
        get: function() {
          return select.get ? select.get(source) : _get(source, select);
        },
        set: function(value) {
          if (select.set) select.set(source, value);
          else _set(source, select, value);
        }
      });
    } else {
      Object.defineProperty(result, name, {
        configurable: true,
        enumerable: true,
        writable: true
      });
    }
  }

  Object.keys(mapping).forEach(function(key) {
    addGetterSetter(key, mapping[key]);
  });

  return result;
};
const _pov = pov(getter, setter);
export default _pov;
export { pov, array, getter, setter };
