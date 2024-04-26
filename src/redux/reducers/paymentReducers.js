// paymentReducers.js

import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
  PAYMENT_LIST_FAIL,
  LIST_ALL_PAYMENTS_REQUEST,
  LIST_ALL_PAYMENTS_SUCCESS,
  LIST_ALL_PAYMENTS_FAIL,
} from "../constants/paymentConstants";

const initialState = {
  payments: [],
  loading: false,
  success: false,
  error: null,
};

export const paymentCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAYMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const paymentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: action.payload,
      };
    case PAYMENT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listAllPaymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ALL_PAYMENTS_REQUEST:
      return { ...state, loading: true };
    case LIST_ALL_PAYMENTS_SUCCESS:
      return { loading: false, payments: action.payload };
    case LIST_ALL_PAYMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
