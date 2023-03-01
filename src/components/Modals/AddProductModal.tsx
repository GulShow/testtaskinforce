import React, { useState } from 'react';
import { AddProductModalProps, Product } from '../../utils/types';
import './Modals.css'

  
  export const AddProductModal: React.FC<AddProductModalProps> = ({ onConfirm, onClose, isOpen }) => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [weight, setWeight] = useState('');
    const [count, setCount] = useState(0);
  
    const handleConfirm = () => {
      if (name && count > 0) {
        const newProduct: Product = {
          id: Date.now(),
          name,
          imageUrl,
          count,
          weight
        };
        onConfirm(newProduct);
        setName('');
        setWeight('');
        setImageUrl('');
        setCount(0);
      }
    };
  
    return (
      <div className={isOpen ? "modalWindow active" : "modalWindow"}>
        <div className={isOpen ? "modal__content active" : "modal__content"}>
          <h2>Add Product</h2>
          <label htmlFor="name-input">Name:</label>
          <input type="text" id="name-input" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="description-input">Image Url:</label>
          <input type="text" id="description-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          <label htmlFor="count-input">Count:</label>
          <input type="number" id="count-input" value={count} onChange={(e) => setCount(Number(e.target.value))} />
          <label htmlFor="count-input">Weight:</label>
          <input type="number" id="count-input" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <div className="modal-buttons">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleConfirm}>Add</button>
          </div>
        </div>
      </div>
    );
  };