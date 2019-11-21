interface QueryParams {
  [key: string]: string;
}

/**
 * Optimize an image
 * @param src Image source
 * @param params Object of params to apply to querystring.
 */
export const optimize = (src: string, params: QueryParams = {}): string => {
  if (src.indexOf('hourly.imgix.net') < 0) {
    return src;
  }
  const queryparams = Object.keys(params).reduce((queryString: string, key) => {
    return `${queryString}&${key}=${params[key]}`;
  }, '');
  return `${src}?auto=compress${queryparams}`;
};

/**
 * Gets an image link and checks if its imgix,
 * if it is blur, it optimizes the photo for more performant loading
 * @param src Image Source
 * @param w Optional: Width of image
 * @param h Optional: Height of image
 */
export const genBlurred = (src: string, params: QueryParams = {}): string => {
  if (src.indexOf('hourly.imgix.net') < 0) {
    return src;
  }
  return optimize(src, {
    ...params,
    fit: 'crop',
    crop: 'entropy',
    blur: '10',
    px: '2',
  });
};

export const MAX_IMAGE_SIZE_BYTES = 25000000;
export const MAX_IMAGE_SIZE_STRING = `${Math.floor(MAX_IMAGE_SIZE_BYTES / 1000000)}mb`;
