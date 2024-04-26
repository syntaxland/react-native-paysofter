// reducers/sellerReducers.js
import {
  SELLER_ACCOUNT_REQUEST,
  SELLER_ACCOUNT_SUCCESS,
  SELLER_ACCOUNT_FAIL,
  GET_SELLER_ACCOUNT_REQUEST,
  GET_SELLER_ACCOUNT_SUCCESS,
  GET_SELLER_ACCOUNT_FAIL,
  UPDATE_SELLER_ACCOUNT_REQUEST,
  UPDATE_SELLER_ACCOUNT_SUCCESS,
  UPDATE_SELLER_ACCOUNT_FAIL,
  BUSINESS_OWNER_DETAIL_REQUEST,
  BUSINESS_OWNER_DETAIL_SUCCESS,
  BUSINESS_OWNER_DETAIL_FAIL,
  SELLER_PHOTO_REQUEST,
  SELLER_PHOTO_SUCCESS,
  SELLER_PHOTO_FAIL,
  SELLER_BANK_ACCOUNT_REQUEST,
  SELLER_BANK_ACCOUNT_SUCCESS,
  SELLER_BANK_ACCOUNT_FAIL,
  SELLER_BVN_REQUEST,
  SELLER_BVN_SUCCESS,
  SELLER_BVN_FAIL,
  GET_BUSINESS_OWNER_DETAILS_REQUEST,
  GET_BUSINESS_OWNER_DETAILS_SUCCESS,
  GET_BUSINESS_OWNER_DETAILS_FAIL,
  UPDATE_BUSINESS_OWNER_DETAILS_REQUEST,
  UPDATE_BUSINESS_OWNER_DETAILS_SUCCESS,
  UPDATE_BUSINESS_OWNER_DETAILS_FAIL,
  GET_BUSINESS_BANK_ACCOUNT_REQUEST,
  GET_BUSINESS_BANK_ACCOUNT_SUCCESS,
  GET_BUSINESS_BANK_ACCOUNT_FAIL,
  UPDATE_BUSINESS_BANK_ACCOUNT_REQUEST,
  UPDATE_BUSINESS_BANK_ACCOUNT_SUCCESS,
  UPDATE_BUSINESS_BANK_ACCOUNT_FAIL,
  GET_SELLER_BVN_REQUEST,
  GET_SELLER_BVN_SUCCESS,
  GET_SELLER_BVN_FAIL,
  UPDATE_SELLER_BVN_REQUEST,
  UPDATE_SELLER_BVN_SUCCESS,
  UPDATE_SELLER_BVN_FAIL,
  GET_SELLER_PHOTO_REQUEST,
  GET_SELLER_PHOTO_SUCCESS,
  GET_SELLER_PHOTO_FAIL,
  UPDATE_SELLER_PHOTO_REQUEST,
  UPDATE_SELLER_PHOTO_SUCCESS,
  UPDATE_SELLER_PHOTO_FAIL,

  CREATE_BUSINESS_STATUS_REQUEST,
CREATE_BUSINESS_STATUS_SUCCESS,
CREATE_BUSINESS_STATUS_FAIL,
GET_BUSINESS_STATUS_REQUEST,
GET_BUSINESS_STATUS_SUCCESS,
GET_BUSINESS_STATUS_FAIL,
UPDATE_BUSINESS_STATUS_REQUEST,
UPDATE_BUSINESS_STATUS_SUCCESS,
UPDATE_BUSINESS_STATUS_FAIL,
} from "../constants/sellerConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  sellerAccount: [],
  sellerDetails: [],
  businessStatus: [],
  sellerBankAccount: [],
  sellerBvn: [],
  sellerPhoto: [],
};

export const createBusinessStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BUSINESS_STATUS_REQUEST:
      return { loading: true };
    case CREATE_BUSINESS_STATUS_SUCCESS:
      return { loading: false, success: true };
    case CREATE_BUSINESS_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBusinessStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS_STATUS_REQUEST:
      return { loading: true };
    case GET_BUSINESS_STATUS_SUCCESS:
      return { loading: false, success: true, businessStatus: action.payload };
    case GET_BUSINESS_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateBusinessStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BUSINESS_STATUS_REQUEST:
      return { loading: true };
    case UPDATE_BUSINESS_STATUS_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_BUSINESS_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_ACCOUNT_REQUEST:
      return { loading: true };
    case GET_SELLER_ACCOUNT_SUCCESS:
      return { loading: false, success: true, sellerAccount: action.payload };
    case GET_SELLER_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_ACCOUNT_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_ACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SELLER_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBusinessOwnerDetailsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_BUSINESS_OWNER_DETAILS_REQUEST:
      return { loading: true };
    case GET_BUSINESS_OWNER_DETAILS_SUCCESS:
      return { loading: false, success: true, sellerDetails: action.payload };
    case GET_BUSINESS_OWNER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateBusinessOwnerDetailsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_BUSINESS_OWNER_DETAILS_REQUEST:
      return { loading: true };
    case UPDATE_BUSINESS_OWNER_DETAILS_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_BUSINESS_OWNER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBankAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS_BANK_ACCOUNT_REQUEST:
      return { loading: true };
    case GET_BUSINESS_BANK_ACCOUNT_SUCCESS:
      return { loading: false, success: true, sellerBankAccount: action.payload };
    case GET_BUSINESS_BANK_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateBankAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BUSINESS_BANK_ACCOUNT_REQUEST:
      return { loading: true };
    case UPDATE_BUSINESS_BANK_ACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_BUSINESS_BANK_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerBvnReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_BVN_REQUEST:
      return { loading: true };
    case GET_SELLER_BVN_SUCCESS:
      return { loading: false, success: true, sellerBvn: action.payload };
    case GET_SELLER_BVN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerBvnReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_BVN_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_BVN_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SELLER_BVN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case GET_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true, sellerPhoto: action.payload };
    case GET_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_ACCOUNT_REQUEST:
      return { loading: true };
    case SELLER_ACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case SELLER_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const businessOwnerDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUSINESS_OWNER_DETAIL_REQUEST:
      return { loading: true };
    case BUSINESS_OWNER_DETAIL_SUCCESS:
      return { loading: false, success: true };
    case BUSINESS_OWNER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerBankAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_BANK_ACCOUNT_REQUEST:
      return { loading: true };
    case SELLER_BANK_ACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case SELLER_BANK_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerBvnReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_BVN_REQUEST:
      return { loading: true };
    case SELLER_BVN_SUCCESS:
      return { loading: false, success: true };
    case SELLER_BVN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_PHOTO_REQUEST:
      return { loading: true };
    case SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true };
    case SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
