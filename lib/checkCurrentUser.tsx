import gql from 'graphql-tag';
export default ({ apolloClient, isAuthorization }) =>
  isAuthorization
    ? apolloClient
        .query({
          query: gql`
            {
              users {
                id
              }
            }
          `,
        })
        .then(({ data }) => {
          return {
            currentUser: data.users && data.users.length > 0 ? data.users[0] : {},
            needsOnboarding:
              data.users &&
              data.users.length > 0 &&
              (data.users[0].profiles.length === 0 ||
                (data.users[0].profiles[0].first_name === null &&
                  data.users[0].last_name === null)),
          };
        })
        .catch((e: any) => {
          console.log(e);
          return { currentUser: {}, needsOnboarding: false };
        })
    : {
        currentUser: {},
        needsOnboarding: false,
      };
