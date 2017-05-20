/* eslint-disable no-console */

// unknown property check adapted from:
// http://exploringjs.com/es6/ch_proxies.html#sec_proxy-use-cases

const IGNORE_LIST = [
  'displayName',
  'name',
];

export default function safe(target) {
  return process.env.NODE_ENV === 'production'
    ? target
    : new Proxy(Object.seal(target), {
      get(getTarget, propKey, receiver) {
        if (!IGNORE_LIST.includes(propKey) && !(propKey in target)) {
          // throw new ReferenceError('Unknown property: ' + propKey);
          console.error(`Warning: Unknown property: ${getTarget.name}.${propKey}`);
        }
        return Reflect.get(target, propKey, receiver);
      },
    });
}
