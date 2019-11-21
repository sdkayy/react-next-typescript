export function dump(obj: any) {
  let out = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      out += `${key}: ${obj[key]}\n`;
    }
  }

  return out;
}

export function pick(object: any, keys: any) {
  return keys.reduce((obj, key) => {
    if (object[key]) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

export function mergeObjects(...args: any) {
  const dst = {};
  let src;
  let p;
  // @ts-ignore
  const aargs = [].splice.call(args, 0);

  while (aargs.length > 0) {
    const idx = 0;
    src = aargs.splice(0, 1)[idx];
    if (toString.call(src) === '[object Object]') {
      for (p in src) {
        if (Object.prototype.hasOwnProperty.call(src, p)) {
          if (toString.call(src[p]) === '[object Object]') {
            dst[p] = mergeObjects(dst[p] || {}, src[p]);
          } else {
            dst[p] = src[p];
          }
        }
      }
    }
  }

  return dst;
}

export function toKebabCase(str: string) {
  if (!(str && typeof str === 'string')) {
    return '';
  }

  const matches = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+|\b)|[A-Z]?[a-z]+|[A-Z]|[0-9]+/g);
  if (!(matches && matches.length)) {
    return str;
  }

  return matches.map(s => s.toLowerCase()).join('-');
}

export function isNight() {
  const hours = new Date().getHours();
  return hours >= 18 || hours < 6;
}
