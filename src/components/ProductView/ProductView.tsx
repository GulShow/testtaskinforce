import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../utils/types";
import { AddCommentModal } from "../Modals/AddCommentModal";
import { DeleteCommentModal } from "../Modals/DeleteCommentModal";
import { EditProductModal } from "../Modals/EditProductModal";
import {
  editProduct,
  addComment,
  deleteComment,
} from "../redux/actions";
import './ProductView.css'

interface Props {
  product: Product;
  handleDeleteProductClick: (event: React.MouseEvent<HTMLButtonElement>, product: Product) => void,
}

const ProductView: React.FC<Props> = ({
  handleDeleteProductClick,
  product,
}) => {
  const dispatch = useDispatch();
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false);
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);

  const handleEditProductClick = () => {
    setIsEditProductModalOpen(true);
  };

  const handleAddCommentClick = () => {
    setIsAddCommentModalOpen(true);
  };

  const handleDeleteCommentClick = (commentId: string) => {
    setSelectedComment(commentId);
    setIsDeleteCommentModalOpen(true);
  };

  const handleEditProductModalClose = () => {
    setIsEditProductModalOpen(false);
  };

  const handleAddCommentModalClose = () => {
    setIsAddCommentModalOpen(false);
  };

  const handleDeleteCommentModalClose = () => {
    setIsDeleteCommentModalOpen(false);
    setSelectedComment(null);
  };

  const handleProductEditConfirm = (editedProduct: Product) => {
    dispatch(editProduct(editedProduct));
    handleEditProductModalClose();
  };

  const handleCommentAddConfirm = (commentText: string) => {
    if (product) {
      dispatch(addComment(product.id, commentText));
      handleAddCommentModalClose();
    }
  };

  const handleCommentDeleteConfirm = () => {
    if (product && selectedComment) {
      dispatch(deleteComment(product.id, selectedComment));
      handleDeleteCommentModalClose();
    }
  };

  return (
    <div>
      {product && (
        <div className="productView card">
        <img className="card-img-top" src={product.imageUrl} alt="imageTest" style={{height: product.size?.height, width: product.size?.width}}  />
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>Count: {product.count}</p>
          <p>Comments:</p>
           <ul className="productView__ul">
            {product.comments?.map((comment) => (
              <li key={comment.id}>
                {comment.text}{" "}
                <button onClick={() => handleDeleteCommentClick(comment.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleAddCommentClick}>Add Comment</button>
           <button onClick={handleEditProductClick}>Edit product</button>
          <button onClick={(event) => handleDeleteProductClick(event,product)}>Delete Product</button>

        </div>
          
          {isEditProductModalOpen && (
            <EditProductModal
              product={product}
              onConfirm={handleProductEditConfirm}
              onClose={handleEditProductModalClose}
              isOpen={isEditProductModalOpen}
            />
          )}
          {isAddCommentModalOpen && (
            <AddCommentModal
              onConfirm={handleCommentAddConfirm}
              onClose={handleAddCommentModalClose}
              isOpen={isAddCommentModalOpen}
            />
          )}
          {isDeleteCommentModalOpen && (
            <DeleteCommentModal
              commentText={
                product.comments?.find(
                  (comment) => comment.id === selectedComment
                )?.text ?? ""
              }
              onConfirm={handleCommentDeleteConfirm}
              onClose={handleDeleteCommentModalClose}
              isOpen={isDeleteCommentModalOpen}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductView;
