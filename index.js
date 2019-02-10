exports = module.exports = (function (state, mapping) {
  mapping = mapping || {};
  state = state || {};
  var result = {};
  function addGetterSetter(name, select) {
    Object.defineProperty(result, name, {
      get: function () { return select.get ? select.get(state) : state[select] },
      set: function (value) { if (select.set) select.set(state, value); else state[select] = value; }
    });
  };
  Object.keys(mapping).forEach(function (key) { addGetterSetter(key, mapping[key] || key); });
  return result;
})