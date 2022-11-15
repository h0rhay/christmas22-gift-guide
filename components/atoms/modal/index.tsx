import React, { ReactNode } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from "framer-motion";
import '@reach/dialog/styles.css';

const DialogOverlayComponent = styled(DialogOverlay)`
  background: hsla(0, 0%, 0%, 0.7);
  z-index: 20;
`;

const DialogContentWrapper = styled(motion.div)`
`

const dropIn = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9
  },
};

const DialogContentComponent = styled(DialogContent)`
  margin: 30vh auto;
  width: 80vw;
  max-width: 33rem;
  padding: 1rem;
  border: 2px solid hsla(0, 0%, 0%, 0.8);
  ${({ theme }) => css`
    ${theme.breakpoints.large} {
      width: 60vw;
    }
  `}
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  width: 1.6rem;
  float: right;
  cursor: pointer;
`;

type IModal = {
  isOpen: boolean;
  onDismiss: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onDismiss, children }: IModal) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <DialogOverlayComponent onClick={onDismiss}>
          <DialogContentWrapper
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DialogContentComponent
              aria-label="dialog opened"
            >
              <CloseButton data-testid="close-button" type="button" onClick={onDismiss}>
                <MdClose />
              </CloseButton>
              {children}
            </DialogContentComponent>
          </DialogContentWrapper>
        </DialogOverlayComponent>
      )}
    </AnimatePresence >
  );
};

export default Modal;