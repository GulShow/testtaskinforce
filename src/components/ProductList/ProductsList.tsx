import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Product } from '../../utils/types';
import { addProduct, deleteProduct, setProducts, setSortedProducts } from '../redux/actions';
import ProductView from '../ProductView/ProductView';
import './ProductList.css';
import { AddProductModal } from '../Modals/AddProductModal';
import { DeleteProductModal } from '../Modals/DeleteProductModal';

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(products => dispatch(setProducts(products)));
  }, []);

  const handleAddProductClick = () => {
    setIsAddProductModalOpen(true);
    console.log('works')
  };

  const handleDeleteProductClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: Product) => {
    setSelectedProduct(product);
    setIsDeleteProductModalOpen(true);
  };


  const handleAddProductModalClose = () => {
    setIsAddProductModalOpen(false);
  };

  const handleDeleteProductModalClose = () => {
    setIsDeleteProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductDeleteConfirm = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct.id));
      handleDeleteProductModalClose();
    }
  };

  const handleProductAddConfirm = (product: Product) => {
    dispatch(addProduct(product));
    handleAddProductModalClose();
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    let sortedProducts: Product[] = [];
  
    if (sortOption === 'alpha_count') {
      sortedProducts = [...products.products].sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        return 0;
      });
    } else if (sortOption === 'count_alpha') {
      sortedProducts = [...products.products].sort((a, b) => {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
  
    dispatch(setSortedProducts(sortedProducts));
  };

  return (
    <div className="productList">
      <div className="productList__header">
        <h1 className="productList__heading">Products List</h1>
      <button className="productList__button" onClick={handleAddProductClick}>Add Product</button>
      <select className="productList__select" onChange={handleSortChange}>
        <option value="alpha_count">Alphabetically</option>
        <option value="count_alpha">By Count</option>
      </select>
      </div>
   
      <ul className="productList__ul">
        {products.products.map((product: Product) => (
          <ProductView key={product.id} handleDeleteProductClick={handleDeleteProductClick} product={product}/>
        ))}
      </ul>
      {isAddProductModalOpen && (
        <AddProductModal onConfirm={handleProductAddConfirm} onClose={handleAddProductModalClose} isOpen={isAddProductModalOpen} />
      )}
      {isDeleteProductModalOpen && (
        <DeleteProductModal
          productName={selectedProduct?.name ?? ''}
          onConfirm={handleProductDeleteConfirm}
          onClose={handleDeleteProductModalClose}
          isOpen={isDeleteProductModalOpen}
        />
      )}
    </div>
  );
};

export default ProductList;
