import isArray from 'lodash/isArray';
import set from 'lodash/fp/set';
import curry from 'lodash/curry';

export default curry(function update(path, fn, value) {
  if (!path.length) {
    return fn(value);
  }

  const key = path[0];
  const subPath = path.slice(1);

  if (key !== '*') {
    const oldValue = value[key];
    const newValue = update(subPath, fn, oldValue);
    return oldValue !== newValue ? set(key, newValue, value) : value;
  } else {
    let _value = value;

    if (isArray(value)) {
      for (let i = 0; i < _value.length; i += 1) {
        const item = _value[i];
        const newItem = update(subPath, fn, item);
        _value = item !== newItem ? set(i, newItem, _value) : _value;
      }
    } else {
      const keys = Object.keys(_value);
      for (const _key of keys) {
        const oldValue = _value[_key];
        const newValue = update(subPath, fn, oldValue);
        _value = oldValue !== newValue ? set(_key, newValue, _value) : _value;
      }
    }

    return _value;
  }
});
