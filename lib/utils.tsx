import { useEffect, useLayoutEffect, useState } from 'react';
import { COMPANY_IMGIX } from './constants';

export function useDebounce(value: any, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export const convertTimestampToDate = (timestamp: number) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(timestamp);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const month = monthNames[monthIndex];
  const year = date.getFullYear();
  const hours = date.getHours() || 0;
  let cleanHours;
  if (hours === 0) {
    cleanHours = 12; // if timestamp is between midnight and 1am, show 12:XX am
  } else {
    cleanHours = hours > 12 ? hours - 12 : hours; // else show proper am/pm -- todo: support 24hr time
  }
  let minutes = date.getMinutes();
  // @ts-ignore
  minutes = minutes >= 10 ? minutes : '0' + minutes.toString(); // turns 4 minutes into 04 minutes
  const ampm = hours >= 12 ? 'pm' : 'am'; // todo: support 24hr time
  return `${month} ${day}, ${year} · ${cleanHours}:${minutes}${ampm}`;
};

export const convertTimestampToTime = (timestamp: Date) => {
  const date = new Date(timestamp);
  const hours = date.getHours() || 0;
  let cleanHours;
  if (hours === 0) {
    cleanHours = 12; // if timestamp is between midnight and 1am, show 12:XX am
  } else {
    cleanHours = hours > 12 ? hours - 12 : hours; // else show proper am/pm -- todo: support 24hr time
  }
  let minutes = date.getMinutes();
  // @ts-ignore
  minutes = minutes >= 10 ? minutes : '0' + minutes.toString(); // turns 4 minutes into 04 minutes
  const ampm = hours >= 12 ? 'pm' : 'am'; // todo: support 24hr time
  return `${cleanHours}:${minutes}${ampm}`;
};

/**
 * Encode a string to base64 (using the Node built-in Buffer)
 *
 * Stolen from http://stackoverflow.com/a/38237610/2115623
 */
export const encode = (encodedString: string) => Buffer.from(encodedString).toString('base64');

/*
  Best guess at if user is on a mobile device. Used in the modal components
  to determine where the modal should be positioned, how it should close and
  scroll, etc
*/
export function isMobile() {
  // @ts-ignore
  // const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // if (
  //   /windows phone/i.test(userAgent) ||
  //   /android/i.test(userAgent) ||
  //   // @ts-ignore
  //   (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  // ) {
  //   return true;
  // }

  return false;
}

export function timeDifference(current: number, previous: number): string {
  if (!previous) {
    return '';
  }

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return 'Just now';
  } else if (elapsed < msPerHour) {
    const now = Math.round(elapsed / msPerMinute);
    if (now === 1) {
      return '1 minute ago';
    } else {
      return `${now} minutes ago`;
    }
  } else if (elapsed < msPerDay) {
    const now = Math.round(elapsed / msPerHour);
    if (now === 1) {
      return '1 hour ago';
    } else {
      return `${now} hours ago`;
    }
  } else if (elapsed < msPerMonth) {
    const now = Math.round(elapsed / msPerDay);
    if (now === 1) {
      return 'Yesterday';
    } else if (now >= 7 && now <= 13) {
      return '1 week ago';
    } else if (now >= 14 && now <= 20) {
      return '2 weeks ago';
    } else if (now >= 21 && now <= 28) {
      return '3 weeks ago';
    } else {
      return `${now} days ago`;
    }
  } else if (elapsed < msPerYear) {
    const now = Math.round(elapsed / msPerMonth);
    if (now === 1) {
      return '1 month ago';
    } else {
      return `${now} months ago`;
    }
  } else {
    const now = Math.round(elapsed / msPerYear);
    if (now === 1) {
      return '1 year ago';
    } else {
      return `${now} years ago`;
    }
  }
}

export function timeDifferenceShort(current: Date, previous: Date) {
  const msPerSecond = 1000;
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerYear = msPerDay * 365;

  // @ts-ignoretimeDifferenceShort
  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    const now = Math.round(elapsed / msPerSecond);
    return `${now}s`;
  } else if (elapsed < msPerHour) {
    const now = Math.round(elapsed / msPerMinute);
    return `${now}m`;
  } else if (elapsed < msPerDay) {
    const now = Math.round(elapsed / msPerHour);
    return `${now}h`;
  } else if (elapsed < msPerYear) {
    const now = Math.round(elapsed / msPerDay);
    return `${now}d`;
  } else {
    const now = Math.round(elapsed / msPerYear);
    return `${now}y`;
  }
}

export const debounce = (func: any, wait: number, immediate: boolean) => {
  let timeout: any;
  return function(...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        // @ts-ignore
        func.apply(this, args);
      }
    }, wait);
    if (immediate && !timeout) {
      // @ts-ignore
      func.apply(this, [...args]);
    }
  };
};

export const throttle = (func: any, threshhold: number, scope: any) => {
  let last: number;
  let deferTimer: any;
  return (...rest) => {
    const context: any = scope;

    const now = +new Date();
    const args = rest;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        func.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      func.apply(context, args);
    }
  };
};

// Truncate a string nicely to a certain length
export const truncate = (str: string, length: number) => {
  if (str.length <= length) {
    return str;
  }
  const subString = str.substr(0, length);
  return subString.substr(0, subString.lastIndexOf(' ')) + '…';
};

export const sortByDate = (array: any[], key: string, order: string) => {
  return array.sort((a, b) => {
    const x = new Date(a[key]).getTime();
    const y = new Date(b[key]).getTime();
    // desc = older to newest from top to bottom
    const val = order === 'desc' ? y - x : x - y;
    return val;
  });
};

export const sortByTitle = (array: any[]) => {
  // @ts-ignore
  return array.sort((a, b) => {
    const x = a.name;
    const y = b.name;
    const val = x.localeCompare(y, {
      sensitivity: 'base',
      numeric: 'true',
      caseFirst: 'upper',
    });
    return val;
  });
};

export const isValidUrl = (website: string) => {
  // tslint:disable-next-line:prefer-const
  let pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-any)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-any)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\Sany)?$/;
  return pattern.test(website);
};

export const isValidEmail = (email: string) => {
  // tslint:disable-next-line:prefer-const
  let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
};

const KEY_CODES = {
  COMMA: 188,
  ENTER: 13,
};

export const DELIMITERS = [KEY_CODES.COMMA, KEY_CODES.ENTER];

export const getCardImage = (brand: string) => {
  switch (brand) {
    case 'Visa':
      return `https://${COMPANY_IMGIX}.imgix.net/public/payment-methods/visa.svg`;
    case 'Discover':
      return `https://${COMPANY_IMGIX}.imgix.net/public/payment-methods/discover.svg`;
    case 'Diners Club':
      return `https://${COMPANY_IMGIX}.imgix.net/public/payment-methods/diners-club.svg`;
    case 'MasterCard':
      return `https://${COMPANY_IMGIX}.imgix.net/public/payment-methods/mastercard.svg`;
    case 'American Express':
      return `https://${COMPANY_IMGIX}.imgix.net/public/payment-methods/amex.svg`;
    case 'JCB':
      return `https://${COMPANY_IMGIX}.imgix.net/public/payment-methods/jcb.svg`;
    default:
      return `https://${COMPANY_IMGIX}.imgix.net/public/payment-methods/card-unknown.svg`;
  }
};

export const formatNumbersToDollars = (amount: number): string =>
  (amount / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
