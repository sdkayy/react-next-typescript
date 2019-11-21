import React from 'react';
import { withApollo } from '../lib/apollo';
import checkCurrentUser from '../lib/checkCurrentUser';
import AppViewWrapper from '../components/appViewWrapper';
import { DefaultContainer } from '../lib/container';

const ApplicationIndex = (props: any) => (
  <DefaultContainer {...props}>
    <AppViewWrapper>
      <p className={'text-lg font-light'}>Testing</p>
    </AppViewWrapper>
  </DefaultContainer>
);

ApplicationIndex.getInitialProps = async context => {
  const { currentUser } = await checkCurrentUser(context);
  return { currentUser, query: context.query };
};

// Anything else like usually withApollo
export default withApollo(ApplicationIndex);
