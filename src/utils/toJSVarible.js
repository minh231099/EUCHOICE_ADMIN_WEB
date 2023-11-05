import { Iterable } from 'immutable';

export default (value) => {
    const rs = Iterable.isIterable(value)
        ? value.toJS()
        : value;
    return rs;
};
