import React from 'react';

interface NavItemProps {
  icon: string;
  path: string;
}

const NavItem = (props: NavItemProps) => {
  return (
    <a className={'p-4 hover:bg-black'}>
      {props.icon},{props.path}
    </a>
  );
};

interface Props {
  currentUser: any;
}

export default (props: Props) => {
  return (
    <div className={'flex flex-col items-center w-full'}>
      <NavItem icon={'home'} path={'/'} />
      <NavItem icon={'home'} path={'/'} />
    </div>
  );
};
