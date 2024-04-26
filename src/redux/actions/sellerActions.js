// actions/sellerActions.js
import axios from "axios";
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

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const createBusinessStatus =
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_BUSINESS_STATUS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/create-business-status/`,
        sellerData,
        config
      );

      dispatch({
        type: CREATE_BUSINESS_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BUSINESS_STATUS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getBusinessStatus = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BUSINESS_STATUS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-business-status/`,
      config
    );

    dispatch({
      type: GET_BUSINESS_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BUSINESS_STATUS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateBusinessStatus =
  (businessData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_BUSINESS_STATUS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-business-status/`,
        businessData,
        config
      );

      dispatch({
        type: UPDATE_BUSINESS_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BUSINESS_STATUS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerAccount = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_ACCOUNT_REQUEST });

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
      `${API_URL}/api/get-seller-account/`,
      config
    );

    dispatch({
      type: GET_SELLER_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSellerAccount =
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_SELLER_ACCOUNT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-seller-account/`,
        sellerData,
        config
      );

      dispatch({
        type: UPDATE_SELLER_ACCOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SELLER_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getBusinessOwnerDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BUSINESS_OWNER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-business-owner-details/`,
      config
    );

    dispatch({
      type: GET_BUSINESS_OWNER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BUSINESS_OWNER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateBusinessOwnerDetails =
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_BUSINESS_OWNER_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-business-owner-details/`,
        sellerData,
        config
      );

      dispatch({
        type: UPDATE_BUSINESS_OWNER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BUSINESS_OWNER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getBusinessBankAccount = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BUSINESS_BANK_ACCOUNT_REQUEST });

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
      `${API_URL}/api/get-seller-bank-account/`,
      config
    );

    dispatch({
      type: GET_BUSINESS_BANK_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BUSINESS_BANK_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateBusinessBankAccount =
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_BUSINESS_BANK_ACCOUNT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-seller-bank_account/`,
        sellerData,
        config
      );

      dispatch({
        type: UPDATE_BUSINESS_BANK_ACCOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BUSINESS_BANK_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getBvn = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_BVN_REQUEST });

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
      `${API_URL}/api/get-seller-bvn/`,
      config
    );

    dispatch({
      type: GET_SELLER_BVN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_BVN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateBvn = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_SELLER_BVN_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/update-seller-bvn/`,
      sellerData,
      config
    );

    dispatch({
      type: UPDATE_SELLER_BVN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SELLER_BVN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSellerPhoto = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_PHOTO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-seller-photo/`,
      config
    );

    dispatch({
      type: GET_SELLER_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_PHOTO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSellerPhoto = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_SELLER_PHOTO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/update-seller-photo/`,
      sellerData,
      config
    );

    dispatch({
      type: UPDATE_SELLER_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SELLER_PHOTO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createSellerAccount =
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: SELLER_ACCOUNT_REQUEST });

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
        `${API_URL}/api/create-seller-account/`,
        sellerData,
        config
      );

      dispatch({
        type: SELLER_ACCOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SELLER_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const businessOwnerDetail =
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: BUSINESS_OWNER_DETAIL_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/business-owner-detail/`,
        sellerData,
        config
      );

      dispatch({
        type: BUSINESS_OWNER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BUSINESS_OWNER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const sellerBankAccount = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SELLER_BANK_ACCOUNT_REQUEST });

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
      `${API_URL}/api/create-seller-bank/`,
      sellerData,
      config
    );

    dispatch({
      type: SELLER_BANK_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_BANK_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sellerBvn = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SELLER_BVN_REQUEST });

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
      `${API_URL}/api/create-seller-bvn/`,
      sellerData,
      config
    );

    dispatch({
      type: SELLER_BVN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_BVN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sellerPhoto = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SELLER_PHOTO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/create-seller-photo/`,
      sellerData,
      config
    );

    dispatch({
      type: SELLER_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_PHOTO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
