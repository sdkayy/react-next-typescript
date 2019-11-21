export function guid() {
  const str4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); // tslint:disable-line
  return `${str4() + str4()}-${str4()}-${str4()}-${str4()}-${str4()}${str4()}${str4()}`;
}

export function isNight() {
  const hours = new Date().getHours();
  return hours >= 18 || hours < 6;
}

// sizes will be multiples of 50 for caching (e.g 50, 100, 150, ...)
export function getSteppedSize(
  size?: number,
  sizeSteps: number = 50,
  getPixelSizeForLayoutSizeFn?: (size: number) => number
) {
  const steppedSize =
    typeof size === 'number' ? sizeSteps * Math.max(1, Math.ceil(size / sizeSteps)) : sizeSteps;

  return getPixelSizeForLayoutSizeFn ? getPixelSizeForLayoutSizeFn(steppedSize) : steppedSize;
}

export function randomBetween(minNumber: number, maxNumber: number) {
  return Math.floor(Math.random() * maxNumber) + minNumber;
}

export function trimNewLinesAndSpaces(text?: string, maxLength: number = 100) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let newText = text.replace(/\s+/g, ' ').trim();
  if (maxLength > 0 && newText.length > maxLength) {
    newText = `${newText.substr(0, maxLength).trim()}...`;
  }

  return newText;
}

export function normalizeUsername(username: string | undefined) {
  if (!username || typeof username !== 'string') {
    return undefined;
  }
  return username.trim().toLowerCase();
}
