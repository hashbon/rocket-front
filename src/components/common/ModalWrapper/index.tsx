import "./index.scss";
import * as React from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "./close.svg";

const modalCustomStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
    overlay: { zIndex: 1000 },
    background: "#151721",
    boxShadow: "0 8px 40px rgb(0 0 0 / 8%), 0 0 4px rgb(0 0 0 / 8%), 0 0 1px 0 rgba(255,255,255,0.5)",
    border: "none",
    color: "#fff",
    borderRadius: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1050,
  },
};

interface IModalWrapperProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ModalWrapper: React.FC<IModalWrapperProps> = ({ children, isOpen, onClose, title }) => (
  <Modal
    shouldCloseOnOverlayClick={true}
    isOpen={isOpen}
    style={modalCustomStyle}
    contentLabel={title}
    onRequestClose={onClose}>
    <div className="ModalWrapper">
      <div className="ModalWrapper_header">
        <div className="title">{title}</div>
        <div className="close" onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <div className="ModalWrapper_body">{children && children}</div>
    </div>
  </Modal>
);
