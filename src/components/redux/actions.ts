import { Product, ProductActionTypes } from "../../utils/types";


export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_SORTED_PRODUCTS = "SET_SORTED_PRODUCTS";

export const addProduct = (product: Product): ProductActionTypes => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const deleteProduct = (productId: number): ProductActionTypes => {
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};

export const editProduct = (editedProduct: Product): ProductActionTypes => ({
  type: EDIT_PRODUCT,
  payload: editedProduct,
});

export const addComment = (
  productId: number,
  commentText: string
): ProductActionTypes => ({
  type: ADD_COMMENT,
  payload: {
    productId,
    comment: {
      id: Date.now().toString(),
      text: commentText,
    },
  },
});

export const deleteComment = (
  productId: number,
  commentId: string
): ProductActionTypes => ({
  type: DELETE_COMMENT,
  payload: {
    productId,
    commentId,
  },
});

export const setProducts = (products: Product[]): ProductActionTypes => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const setSortedProducts = (products: Product[]): ProductActionTypes => ({
  type: SET_SORTED_PRODUCTS,
  payload: products,
});




