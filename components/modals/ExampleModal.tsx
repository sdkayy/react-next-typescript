import React, { useState } from 'react';
import Modal from 'react-modal';
import { ModalContainer, modalStyles } from './styles';

interface Props {
  index: number;
  closeModal: any;
  dark: boolean;
  type: 'experience' | 'apply';
  modalProps: any;
  key: string;
}

export default (props: Props) => {
  const { closeModal, modalProps } = props;
  const styles = modalStyles(700);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
      contentLabel={''}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={styles}
      closeTimeoutMS={330}
    >
      ]
      <ModalContainer title={''} closeModal={closeModal}>
        <p>stuff here</p>
      </ModalContainer>
    </Modal>
  );
};
