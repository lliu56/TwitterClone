import React, { useCallback } from "react";

interface ModalProps {
  isOpen?: Boolean;
  onSubmit: () => void;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  ActionLabel: string;
  disabled?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
  title,
  body,
  footer,
  ActionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return;
  }
  return <div className=""></div>;
};
