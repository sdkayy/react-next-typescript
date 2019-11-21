import { UserInfoType } from '../shared/graphql/fragments/user/userInfo';

export const isViewingOpenPage = (viewing: string, currentUser: UserInfoType) => {
  const isRoot = viewing === '/';

  if (isRoot && Object.keys(currentUser).length === 0) {
    return true;
  }

  return (
    viewing === '/about' ||
    viewing === '/support' ||
    viewing === '/security' ||
    viewing === '/team' ||
    viewing === '/privacy' ||
    viewing === '/support' ||
    viewing === '/terms' ||
    viewing === '/login' ||
    viewing === '/signup'
  );
};

export const isViewingPrivatePage = (viewing: string) => {
  return (
    viewing === '/user' ||
    viewing === '/meSettings' ||
    viewing === '/userSettings' ||
    viewing === '/notifications' ||
    viewing === '/new'
  );
};
