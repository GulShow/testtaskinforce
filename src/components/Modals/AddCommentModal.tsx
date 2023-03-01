import React, { useState } from 'react';
import { AddCommentModalProps } from '../../utils/types';
import './Modals.css'


  
  export const AddCommentModal: React.FC<AddCommentModalProps> = ({ onConfirm, onClose, isOpen }) => {
    const [commentText, setCommentText] = useState("");
  
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentText(e.target.value);
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm(commentText);
    };
  
    return (
      <div className={isOpen ? "modalWindow active" : "modalWindow"}>
        <div className={isOpen ? "modal__content active" : "modal__content"}>
           <h2>Add Comment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Comment:
            <br />
            <textarea value={commentText} onChange={handleTextChange} />
          </label>
          <br />
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
        </div>
      </div>
    );
  };