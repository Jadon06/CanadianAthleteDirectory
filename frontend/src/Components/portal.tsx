import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return createPortal(
    <div className="modal-overlay">{children}</div>,
    document.body
  );
}
