// PromiseReducers.js
import {
  GET_BUYER_PROMISE_REQUEST,
  GET_BUYER_PROMISE_SUCCESS,
  GET_BUYER_PROMISE_FAIL,
  GET_SELLER_PROMISE_REQUEST,
  GET_SELLER_PROMISE_SUCCESS,
  GET_SELLER_PROMISE_FAIL,
  BUYER_CONFIRM_PROMISE_REQUEST,
  BUYER_CONFIRM_PROMISE_SUCCESS,
  BUYER_CONFIRM_PROMISE_FAIL,
  SELLER_CONFIRM_PROMISE_REQUEST,
  SELLER_CONFIRM_PROMISE_SUCCESS,
  SELLER_CONFIRM_PROMISE_FAIL,
  // CREATE_PROMISE_MESSAGE_REQUEST,
  // CREATE_PROMISE_MESSAGE_SUCCESS,
  // CREATE_PROMISE_MESSAGE_FAIL,
  // LIST_PROMISE_MESSAGE_REQUEST,
  // LIST_PROMISE_MESSAGE_SUCCESS,
  // LIST_PROMISE_MESSAGE_FAIL,
  SETTLE_DISPUTED_PROMISE_REQUEST,
  SETTLE_DISPUTED_PROMISE_SUCCESS,
  SETTLE_DISPUTED_PROMISE_FAIL,
  GET_ALL_PROMISE_REQUEST,
  GET_ALL_PROMISE_SUCCESS,
  GET_ALL_PROMISE_FAIL,

  CANCEL_PROMISE_REQUEST,
CANCEL_PROMISE_SUCCESS,
CANCEL_PROMISE_FAIL,

BUYER_CREATE_PROMISE_MESSAGE_REQUEST,
BUYER_CREATE_PROMISE_MESSAGE_SUCCESS,
BUYER_CREATE_PROMISE_MESSAGE_FAIL,
SELLER_CREATE_PROMISE_MESSAGE_REQUEST,
SELLER_CREATE_PROMISE_MESSAGE_SUCCESS,
SELLER_CREATE_PROMISE_MESSAGE_FAIL,

LIST_BUYER_PROMISE_MESSAGE_REQUEST,
LIST_BUYER_PROMISE_MESSAGE_SUCCESS,
LIST_BUYER_PROMISE_MESSAGE_FAIL,
LIST_SELLER_PROMISE_MESSAGE_REQUEST,
LIST_SELLER_PROMISE_MESSAGE_SUCCESS,
LIST_SELLER_PROMISE_MESSAGE_FAIL,
CLEAR_BUYER_PROMISE_MESSAGE_COUNTER_REQUEST,
CLEAR_BUYER_PROMISE_MESSAGE_COUNTER_SUCCESS,
CLEAR_BUYER_PROMISE_MESSAGE_COUNTER_FAIL,
CLEAR_SELLEE_PROMISE_MESSAG_COUNTERE_REQUEST,
CLEAR_SELLEE_PROMISE_MESSAG_COUNTERE_SUCCESS,
CLEAR_SELLEE_PROMISE_MESSAG_COUNTERE_FAIL,
} from "../constants/PromiseConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  promises: [],
  promiseMessages: [],
  buyerPromiseMessages: [],
  sellerPromiseMessages: [],
};

export const listBuyerPromiseMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_BUYER_PROMISE_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case LIST_BUYER_PROMISE_MESSAGE_SUCCESS:
      return { loading: false, success: true, buyerPromiseMessages: action.payload };
    case LIST_BUYER_PROMISE_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listSellerPromiseMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SELLER_PROMISE_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case LIST_SELLER_PROMISE_MESSAGE_SUCCESS:
      return { loading: false, success: true, sellerPromiseMessages: action.payload };
    case LIST_SELLER_PROMISE_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const buyerClearPromiseMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_BUYER_PROMISE_MESSAGE_COUNTER_REQUEST:
      return { ...state, loading: true };
    case CLEAR_BUYER_PROMISE_MESSAGE_COUNTER_SUCCESS:
      return { loading: false, success: true };
    case CLEAR_BUYER_PROMISE_MESSAGE_COUNTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerClearPromiseMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SELLEE_PROMISE_MESSAG_COUNTERE_REQUEST:
      return { ...state, loading: true };
    case CLEAR_SELLEE_PROMISE_MESSAG_COUNTERE_SUCCESS:
      return { loading: false, success: true };
    case CLEAR_SELLEE_PROMISE_MESSAG_COUNTERE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const listPromiseMessagesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LIST_PROMISE_MESSAGE_REQUEST:
//       return { ...state, loading: true };
//     case LIST_PROMISE_MESSAGE_SUCCESS:
//       return { loading: false, success: true, promiseMessages: action.payload };
//     case LIST_PROMISE_MESSAGE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export const buyerCreatePromiseMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUYER_CREATE_PROMISE_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case BUYER_CREATE_PROMISE_MESSAGE_SUCCESS:
      return { loading: false, success: true };
    case BUYER_CREATE_PROMISE_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerCreatePromiseMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_CREATE_PROMISE_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case SELLER_CREATE_PROMISE_MESSAGE_SUCCESS:
      return { loading: false, success: true };
    case SELLER_CREATE_PROMISE_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cancelPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_PROMISE_REQUEST:
      return { ...state, loading: true };
    case CANCEL_PROMISE_SUCCESS:
      return { loading: false, success: true };
    case CANCEL_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROMISE_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_PROMISE_SUCCESS:
      return { loading: false, success: true, promises: action.payload };
    case GET_ALL_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const settleDisputedPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTLE_DISPUTED_PROMISE_REQUEST:
      return { ...state, loading: true };
    case SETTLE_DISPUTED_PROMISE_SUCCESS:
      return { loading: false, success: true };
    case SETTLE_DISPUTED_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const createPromiseMessagesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CREATE_PROMISE_MESSAGE_REQUEST:
//       return { ...state, loading: true };
//     case CREATE_PROMISE_MESSAGE_SUCCESS:
//       return { loading: false, success: true };
//     case CREATE_PROMISE_MESSAGE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };



export const getBuyerpromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUYER_PROMISE_REQUEST:
      return { ...state, loading: true };
    case GET_BUYER_PROMISE_SUCCESS:
      return { loading: false, success: true, promises: action.payload };
    case GET_BUYER_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_PROMISE_REQUEST:
      return { ...state, loading: true };
    case GET_SELLER_PROMISE_SUCCESS:
      return { loading: false, success: true, promises: action.payload };
    case GET_SELLER_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const buyerConfirmPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUYER_CONFIRM_PROMISE_REQUEST:
      return { ...state, loading: true };
    case BUYER_CONFIRM_PROMISE_SUCCESS:
      return { loading: false, success: true };
    case BUYER_CONFIRM_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerConfirmPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_CONFIRM_PROMISE_REQUEST:
      return { ...state, loading: true };
    case SELLER_CONFIRM_PROMISE_SUCCESS:
      return { loading: false, success: true };
    case SELLER_CONFIRM_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
