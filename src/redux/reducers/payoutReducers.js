// payoutReducers.js
import {
  USER_PAYOUT_REQUEST,
  USER_PAYOUT_SUCCESS,
  USER_PAYOUT_FAIL,
} from "../constants/payoutConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  payouts: [],
};

export const userPayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PAYOUT_REQUEST:
      return { ...state, loading: true };
    case USER_PAYOUT_SUCCESS:
      return { loading: false, success: true, payouts: action.payload };
    case USER_PAYOUT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
