// PromiseActions.js
import axios from "axios";
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

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const listBuyerPromiseMessages =
  (promiseId) => async (dispatch, getState) => {
    try {
      dispatch({ type: LIST_BUYER_PROMISE_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/api/list-buyer-promise-messages/${promiseId}/`,
        config
      );

      dispatch({ type: LIST_BUYER_PROMISE_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_BUYER_PROMISE_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listSellerPromiseMessages =
  (promiseId) => async (dispatch, getState) => {
    try {
      dispatch({ type: LIST_SELLER_PROMISE_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/api/list-seller-promise-messages/${promiseId}/`,
        config
      );

      dispatch({ type: LIST_SELLER_PROMISE_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_SELLER_PROMISE_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const clearBuyerMessageCounter =
  (promiseMessageData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CLEAR_BUYER_PROMISE_MESSAGE_COUNTER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/clear-buyer-promise-message-counter/`,
        promiseMessageData,
        config
      );

      dispatch({
        type: CLEAR_BUYER_PROMISE_MESSAGE_COUNTER_SUCCESS,
        payload: data,
      });
      // window.location.href = "/promise";
      // window.location.reload();
    } catch (error) {
      dispatch({
        type: CLEAR_BUYER_PROMISE_MESSAGE_COUNTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const clearSellerMessageCounter =
  (promiseMessageData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CLEAR_SELLEE_PROMISE_MESSAG_COUNTERE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/clear-seller-promise-message-counter/`,
        promiseMessageData,
        config
      );

      dispatch({
        type: CLEAR_SELLEE_PROMISE_MESSAG_COUNTERE_SUCCESS,
        payload: data,
      });
      // window.location.href = "/promise";
      // window.location.reload();
    } catch (error) {
      dispatch({
        type: CLEAR_SELLEE_PROMISE_MESSAG_COUNTERE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// export const listPromiseMessages =
//   (promiseId) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: LIST_PROMISE_MESSAGE_REQUEST });

//       const {
//         userLogin: { userInfo },
//       } = getState();

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.access}`,
//         },
//       };

//       const { data } = await axios.get(
//         `${API_URL}/api/list-promise-messages/${promiseId}/`,
//         config
//       );

//       dispatch({ type: LIST_PROMISE_MESSAGE_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({
//         type: LIST_PROMISE_MESSAGE_FAIL,
//         payload:
//           error.response && error.response.data.detail
//             ? error.response.data.detail
//             : error.message,
//       });
//     }
//   };

export const buyerCreatePromiseMessage =
  (promiseMessageData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BUYER_CREATE_PROMISE_MESSAGE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/buyer-create-promise-message/`,
        promiseMessageData,
        config
      );

      dispatch({
        type: BUYER_CREATE_PROMISE_MESSAGE_SUCCESS,
        payload: data,
      });
      // window.location.href = "/promise";
      // window.location.reload();
    } catch (error) {
      dispatch({
        type: BUYER_CREATE_PROMISE_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const sellerCreatePromiseMessage =
  (promiseMessageData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SELLER_CREATE_PROMISE_MESSAGE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/seller-create-promise-message/`,
        promiseMessageData,
        config
      );

      dispatch({
        type: SELLER_CREATE_PROMISE_MESSAGE_SUCCESS,
        payload: data,
      });
      // window.location.href = "/promise";
      // window.location.reload();
    } catch (error) {
      dispatch({
        type: SELLER_CREATE_PROMISE_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const cancelPromise = (promiseData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CANCEL_PROMISE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/cancel-promise/`,
      promiseData,
      config
    );

    dispatch({
      type: CANCEL_PROMISE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_PROMISE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllPromises = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_PROMISE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-promises/`,
      config
    );

    dispatch({
      type: GET_ALL_PROMISE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PROMISE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const settleDisputedPromise =
  (promiseData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SETTLE_DISPUTED_PROMISE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/settle-disputed-promise/`,
        promiseData,
        config
      );

      dispatch({
        type: SETTLE_DISPUTED_PROMISE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SETTLE_DISPUTED_PROMISE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// export const createPromiseMessages =
//   (promiseMessageData) => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: CREATE_PROMISE_MESSAGE_REQUEST,
//       });

//       const {
//         userLogin: { userInfo },
//       } = getState();

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.access}`,
//         },
//       };

//       const { data } = await axios.post(
//         `${API_URL}/api/create-promise-messages/`,
//         promiseMessageData,
//         config
//       );

//       dispatch({
//         type: CREATE_PROMISE_MESSAGE_SUCCESS,
//         payload: data,
//       });
//       // window.location.href = "/promise";
//       // window.location.reload();
//     } catch (error) {
//       dispatch({
//         type: CREATE_PROMISE_MESSAGE_FAIL,
//         payload:
//           error.response && error.response.data.detail
//             ? error.response.data.detail
//             : error.message,
//       });
//     }
//   };

export const getSellerPromises = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SELLER_PROMISE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-seller-promise/`,
      config
    );

    dispatch({
      type: GET_SELLER_PROMISE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_PROMISE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getBuyerPromises = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_BUYER_PROMISE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-buyer-promise/`,
      config
    );

    dispatch({
      type: GET_BUYER_PROMISE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BUYER_PROMISE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const buyerConfirmPromise =
  (promiseData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BUYER_CONFIRM_PROMISE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/buyer-confirm-promise/`,
        promiseData,
        config
      );

      dispatch({
        type: BUYER_CONFIRM_PROMISE_SUCCESS,
        payload: data,
      });
      // window.location.href = "/promise";
      // window.location.reload();
    } catch (error) {
      dispatch({
        type: BUYER_CONFIRM_PROMISE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const sellerConfirmPromise =
  (promiseData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SELLER_CONFIRM_PROMISE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/seller-confirm-promise/`,
        promiseData,
        config
      );

      dispatch({
        type: SELLER_CONFIRM_PROMISE_SUCCESS,
        payload: data,
      });
      window.location.reload();
      window.location.href = "/dashboard/users";
    } catch (error) {
      dispatch({
        type: SELLER_CONFIRM_PROMISE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
