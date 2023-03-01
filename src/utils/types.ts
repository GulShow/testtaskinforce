import { ADD_COMMENT, ADD_PRODUCT, DELETE_COMMENT, DELETE_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS, SET_SORTED_PRODUCTS } from "../components/redux/actions";

export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size?: { height: number, width: number};
  weight: string;
  comments?: Comment[];
};

export type Comment = {
  id: string;
  text: string;
};

export type ProductActionTypes =
  | { type: typeof ADD_PRODUCT; payload: Product }
  | { type: typeof DELETE_PRODUCT; payload: number }
  | { type: typeof EDIT_PRODUCT; payload: Product }
  | { type: typeof ADD_COMMENT; payload: { productId: number; comment: Comment } }
  | { type: typeof DELETE_COMMENT; payload: { productId: number; commentId: string } }
  | { type: typeof SET_PRODUCTS; payload: Product[] }
  | { type: typeof SET_SORTED_PRODUCTS; payload: Product[] };

  //MODALS
  export interface AddCommentModalProps {
    onConfirm: (commentText: string) => void;
    onClose: () => void;
    isOpen: boolean,
  }

  export type AddProductModalProps = {
    onConfirm: (product: Product) => void;
    onClose: () => void;
    isOpen: boolean;
  };

  export interface DeleteCommentModalProps {
    commentText: string;
    onConfirm: () => void;
    onClose: () => void;
    isOpen: boolean,
  }

  export type DeleteProductModalProps = {
    productName: string;
    onConfirm: () => void;
    onClose: () => void;
    isOpen: boolean,
  };

  export interface EditProductModalProps {
    product: Product;
    onConfirm: (editedProduct: Product) => void;
    onClose: () => void;
    isOpen: boolean,
  }