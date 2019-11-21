import React from 'react';
import { isMobile } from '../../lib/utils';
import { zIndex } from '../globals';

/*
  This is the global stylesheet for all modal components. Its styles will wrap
  all modal content, so we should be selective about what is included here
*/

const mobile = isMobile();
/*
  modalStyles are defined as a JS object because it gets passed in as inline
  styles to the react-modal component. Takes an optional maxWidth argument for
  desktop sizing.
*/
export const modalStyles = (maxWidth: number = 750) => {
  return {
    // dark background behind all modals
    overlay: {
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: mobile ? 'flex-start' : 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: zIndex.modal - 1,
      padding: '1.2rem',
    },
    // modal root
    content: {
      position: 'relative',
      background: '#ffffff',
      backgroundClip: 'padding-box',
      border: '0',
      padding: '0',
      zIndex: zIndex.modal,
      width: '100%',
      maxWidth: `${maxWidth}px`,
      maxHeight: '700px', // <-- This sets the height
      // overflow: 'scroll', // <-- This tells the modal to scrol
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      boxShadow: '0 4px 24px rgba(0,0,0,0.40)',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
  };
};

/*
  ModalContainer is included around all modal components in order to have a
  consistent wrapper and consistent close-button behavior. Otherwise it will
  accept any arbitrary content via `props.children`
*/

export const ModalContainer = ({
  closeModal,
  children,
  title,
}: {
  closeModal: any;
  children?: any;
  title: string;
}): JSX.Element => {
  return (
    <div
      className={'flex flex-col justify-between rounded-lg p-3 h-full bg-white overflow-visible'}
    >
      <div>
        <h2>{title}</h2>
        <a
          className={'absolute z-10 text-muted-40 hover:text-red'}
          style={{ top: '8px', right: '8px' }}
          onClick={() => closeModal()}
        >
          X
        </a>
      </div>

      <div>{children}</div>
    </div>
  );
};
