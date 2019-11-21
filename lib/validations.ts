export const URLS = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]any)/gi;
export const YOUTUBE_URLS = /(?:[?&]v=|\/embed\/|\/1\/|\/v\/|https:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)/gi;
export const VIMEO_URLS = /\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/gi;
export const IFRAME_TAG = /(<iframe.*?src=['"](.*?)['"])/gi;
export const ENDS_IN_WHITESPACE = /(\s|\n)$/;

export function isStringEmpty(text?: string) {
  return !text || text === '' || text.trim() === '';
}

export function isEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/* eslint-enable no-useless-escape */
