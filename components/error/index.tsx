// This component is shown as a full replacement for the entire app in production whenever an error happens that would otherwise crash the app
import React from 'react';
import ViewError from '../viewError';
import ErrorBoundary from './ErrorBoundary';

const BlueScreen = () => (
  <ViewError
    type={'error'}
    heading={'Something went wrong'}
    subheading={
      'Sorry about the technical issue. Our engineers have been notified of the problem and should resolve it soon.'
    }
    refresh={true}
  />
);

export { ErrorBoundary };
export default BlueScreen;
