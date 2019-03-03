"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.array = exports.pov = exports.default = void 0;

var getter = function getter(o, field) {
  return o[field];
};

var setter = function setter(o, field, v) {
  o[field] = v;
};

var array = function array() {
  var _get = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getter;

  var _set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : setter;

  return function (field) {
    var mapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (unmapped) {
      return unmapped;
    };
    return {
      get: function get(o) {
        return (_get(o, field) || []).map(function (unmapped) {
          return mapper(unmapped);
        });
      },
      set: function set(o, v) {
        _set(o, field, v.map(function (mapped) {
          var unmapped = {};
          var newMapped = mapper(unmapped);
          newMapped.inject(mapped);
          return unmapped;
        }));
      }
    };
  };
};

exports.array = array;

var pov = function pov() {
  var _get = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getter;

  var _set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : setter;

  return function () {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var mapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    // mapping = mapping || {};
    // source = source || {};
    // options = options || {};
    // var _get = options.get || getter;
    // var _set = options.set || setter;
    function clone() {
      return pov(_get, _set)(source, mapping);
    }

    function inject(from) {
      var _this = this;

      from = from || {};
      Object.keys(from).forEach(function (key) {
        key in mapping && _set(_this, key, _get(from, key));
      });
      return result;
    }

    function eject() {
      var _this2 = this;

      return Object.keys(mapping).reduce(function (ejectable, key) {
        _set(ejectable, key, _get(_this2, key));

        return ejectable;
      }, {});
    }

    var result = {
      array: array(_get, _set),
      clone: clone,
      inject: inject,
      eject: eject,

      get source() {
        return Object.assign({}, source);
      }

    };

    function addGetterSetter(name, select) {
      if (select) {
        Object.defineProperty(result, name, {
          configurable: false,
          enumerable: true,
          get: function get() {
            return select.get ? select.get(source) : _get(source, select);
          },
          set: function set(value) {
            if (select.set) select.set(source, value);else _set(source, select, value);
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

    Object.keys(mapping).forEach(function (key) {
      addGetterSetter(key, mapping[key]);
    });
    return result;
  };
};

exports.pov = pov;

var _default = pov(getter, setter);

exports.default = _default;
//# sourceMappingURL=pov.js.map