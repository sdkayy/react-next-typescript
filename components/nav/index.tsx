import React from 'react';
import Icon from '../icons';

interface NavItemProps {
  icon: string;
  path: string;
}

const NavItem = (props: NavItemProps) => {
  return (
    <a
      className={
        'flex flex-col justify-center items-center p-4 hover:bg-black hover:text-white border-b border-text-muted-10 cursor-pointer'
      }
    >
      <Icon glyph={props.icon} size={'24'} />
    </a>
  );
};

interface Props {
  currentUser?: any;
}

export default (props: Props) => {
  return (
    <div className={'flex flex-col items-center w-full bg-white box-shadow'}>
      <NavItem icon={'home'} path={'/'} />
      <NavItem icon={'home'} path={'/apps'} />
    </div>
  );
};
