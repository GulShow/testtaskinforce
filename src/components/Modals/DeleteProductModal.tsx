import React from 'react';
import { DeleteProductModalProps } from '../../utils/types';
import './Modals.css'


  
  export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ productName, onConfirm, onClose, isOpen }) => {
    const handleConfirm = () => {
      onConfirm();
    };
  
    return (
      <div className={isOpen ? "modalWindow active" : "modalWindow"}>
        <div className={isOpen ? "modal__content active" : "modal__content"}>
          <h2>Delete Product</h2>
          <p>Are you sure you want to delete "{productName}"?</p>
          <div className="modal-buttons">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleConfirm}>Delete</button>
          </div>
        </div>
      </div>
    );
  };