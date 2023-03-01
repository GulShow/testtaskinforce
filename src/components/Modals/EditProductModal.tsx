import React, { useState } from 'react';
import { EditProductModalProps } from '../../utils/types';
import './Modals.css'

  
  export const EditProductModal: React.FC<EditProductModalProps> = ({
    product,
    onConfirm,
    onClose,
    isOpen
  }) => {
    const [editedProduct, setEditedProduct] = useState(product);
  
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedProduct({
        ...editedProduct,
        name: e.target.value,
      });
    };
  
    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedProduct({
        ...editedProduct,
        count: parseInt(e.target.value),
      });
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm(editedProduct);
    };
  
    return (
      <div className={isOpen ? "modalWindow active" : "modalWindow"}>
        <div className={isOpen ? "modal__content active" : "modal__content"}>
             <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={editedProduct.name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Count:
            <input type="number" value={editedProduct.count} onChange={handleCountChange} />
          </label>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
        </div>
        <h2>Edit Product</h2>
     
      </div>
    );
  };