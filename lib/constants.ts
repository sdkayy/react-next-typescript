export const IS_PROD = process.env.NODE_ENV === 'production';
// In production the API is at the same URL, in development it's at a different port
export const API_URI =
  IS_PROD && !process.env.TEST_DB
    ? 'https://hasura.hourlylabs.com/v1/graphql'
    : 'http://localhost:8080/v1/graphql';

export const BASE_URL = IS_PROD ? 'https://www.hourlylabs.com' : 'http://localhost:3000';
export const BASE_APIURL = `${BASE_URL}/api`;

export const WS_URI = IS_PROD
  ? `wss://hasura.hourlylabs.com/v1/graphql`
  : 'ws://localhost:8080/v1/graphql';

export const COMPANY_IMGIX = 'hourly';
