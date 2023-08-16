import React, { useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9909;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;

  overflow: auto; /* Added */

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ContentContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  position: relative;
  width: 30vw;
  max-height: 50vh;
`;

const Content = styled.div`
  padding: 20px;
  overflow: auto;
  max-height: 50vh;
  text-wrap: pre-wrap;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
`;

const Modal = ({ open, children, handleClose }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <Overlay open={open} onClick={handleClose}>
      <ContentContainer>
        <CloseButton onClick={handleClose}>✖</CloseButton>
        <Content onClick={handleContentClick}>{children}</Content>
      </ContentContainer>
    </Overlay>
  );
};

export default Modal;
