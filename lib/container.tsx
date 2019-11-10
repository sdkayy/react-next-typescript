import React from 'react';
import App from '../components/App';
import ErrorFallback, { ErrorBoundary } from '../components/error';
import ScrollManager from '../components/scrollManager';

interface Props {
  children: any;
  currentUser?: any;
  needsOnboarding?: boolean;
}

export default (props: Props) => (
  <App>
    <ErrorBoundary fallbackComponent={ErrorFallback}>
      <style jsx={true}>
        {`
          .main-container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
          }
          main {
            display: grid;
            width: 100%;
            backgroundcolor: '#FFFFFF';
            grid-template-columns: max-content 1fr;
            grid-template-areas: 'navigation main';
            width: 100vw;
            height: 100vh;
          }
          @media (max-width: 768px) {
            main {
              display: flex;
              flex-direction: column;
            }
          }
        `}
      </style>
      <ScrollManager>
        <div className={'main-container'}>
          <main>{props.children}</main>
        </div>
      </ScrollManager>
    </ErrorBoundary>
  </App>
);
