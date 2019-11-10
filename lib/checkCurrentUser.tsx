import gql from 'graphql-tag';

export default ({ apolloClient, isAuthorization }) =>
  isAuthorization
    ? apolloClient
        .query({
          query: gql``,
        })
        .then(({ data }) => {
          return {
            currentUser: {},
          };
        })
        .catch((e: any) => {
          console.log(e);
          return { currentUser: {} };
        })
    : {
        currentUser: {},
      };
