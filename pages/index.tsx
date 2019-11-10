import React from 'react';
import Container from '../lib/container';
import { withApollo } from '../lib/withApollo';
import checkCurrentUser from '../lib/checkCurrentUser';

const ApplicationIndex = (props: any) => (
  <Container {...props}>
    <p>Testing</p>
  </Container>
);

ApplicationIndex.getInitialProps = async context => {
  const { currentUser } = await checkCurrentUser(context);
  return { currentUser, query: context.query };
};

// Anything else like usually withApollo
export default withApollo(ApplicationIndex);
