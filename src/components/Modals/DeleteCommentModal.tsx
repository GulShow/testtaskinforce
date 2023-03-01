import React, { useState } from 'react';
import { DeleteCommentModalProps } from '../../utils/types';
import './Modals.css'

  
  export const DeleteCommentModal: React.FC<DeleteCommentModalProps> = ({
    commentText,
    onConfirm,
    onClose,
    isOpen
  }) => {
    const [confirmation, setConfirmation] = useState("");
  
    const handleConfirmationChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setConfirmation(event.target.value);
    };
  
    const handleConfirmClick = () => {
      if (confirmation.toLowerCase() === "confirm") {
        onConfirm();
      }
    };
  
    return (
      <div className={isOpen ? "modalWindow active" : "modalWindow"}>
        <div className={isOpen ? "modal__content active" : "modal__content"}>
          <h2>Delete Comment</h2>
        <p>Are you sure you want to delete this comment?</p>
        <p>{commentText}</p>
        <input
          type="text"
          value={confirmation}
          onChange={handleConfirmationChange}
          placeholder="Type 'confirm' to confirm"
        />
        <button onClick={handleConfirmClick}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
        </div>
       
      </div>
    );
  };