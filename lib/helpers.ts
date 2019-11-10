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
