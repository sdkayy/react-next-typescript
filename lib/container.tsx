import React from 'react';
import ErrorFallback, { ErrorBoundary } from '../components/error';
import { withModals } from '../components/modals';
import Nav from '../components/nav';
import ScrollManager from '../components/scrollManager';
import { withToasts } from '../components/toasts';

interface Props {
  children: JSX.Element;
  currentUser?: any;
  needsOnboarding?: boolean;
}

export const DefaultContainer = withModals(
  withToasts((props: Props) => (
    <ErrorBoundary fallbackComponent={ErrorFallback}>
      <style jsx={true}>
        {`
          .main-container {
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
          }

          main {
            display: grid;
            grid-template-columns: max-content 1fr;
            background-color: var(--theme-background-color-less-1);
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
          <main>
            <Nav currentUser={props.currentUser} />
            {props.children}
          </main>
        </div>
      </ScrollManager>
    </ErrorBoundary>
  ))
);
