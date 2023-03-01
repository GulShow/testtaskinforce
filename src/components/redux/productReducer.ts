import { ADD_COMMENT, ADD_PRODUCT, DELETE_COMMENT, DELETE_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS, SET_SORTED_PRODUCTS } from '../redux/actions';
import { Product, ProductActionTypes } from '../../utils/types';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case ADD_COMMENT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? {
                ...product,
                comments: [
                  ...(product.comments || []),
                  { id: new Date().getTime().toString(), text: action.payload.comment.text },
                ],
              }
            : product
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? {
                ...product,
                comments: (product.comments || []).filter(
                  (comment) => comment.id !== action.payload.commentId
                ),
              }
            : product
        ),
      };
      case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
      case SET_SORTED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;

