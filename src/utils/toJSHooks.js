import { Iterable } from 'immutable';

export default (object) => {
  const rs = {};
  Object.keys(object).forEach((key) => {
    rs[key] = Iterable.isIterable(object[key])
      ? object[key].toJS()
      : object[key];
  });
  return rs;
};
