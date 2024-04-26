// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  userTransactionReducer,
  createTransactionReducer,
} from "./reducers/transactionReducers";
import { userPayoutReducer } from "./reducers/payoutReducers";

import {
  userLoginReducers,
  userRegisterReducers,
  updateUserLastLoginReducer,
} from "./reducers/userReducers";

import {
  selecteCurrencyReducer,
  getSelectedCurrencyReducer,
} from "./reducers/settingsReducers";

import {
  messagingReducer,
  sendEmailReducer,
  clearMessageCounterReducer,
  getUserMessagesReducer,
} from "./reducers/messagingReducers";

import {
  sellerAccountReducer,
  getSellerAccountReducer,
  createBusinessStatusReducer,
  getBusinessStatusReducer,
  updateBusinessStatusReducer,
  updateSellerAccountReducer,
  getBusinessOwnerDetailsReducer,
  updateBusinessOwnerDetailsReducer,
  getBankAccountReducer,
  updateBankAccountReducer,
  getSellerBvnReducer,
  updateSellerBvnReducer,
  getSellerPhotoReducer,
  updateSellerPhotoReducer,
  businessOwnerDetailReducer,
  sellerBankAccountReducer,
  sellerBvnReducer,
  sellerPhotoReducer,
} from "./reducers/sellerReducers";

import {
  fundAccountReducer,
  getUserAccountFundDebitsReducer,
  getAllAccountFundBalanceReducer,
  activateAccountFundReducer,
  getUserUsdAccountFundBalanceReducer,
  toggleUsdAccountFundReducer,
  fundUsdAccountReducer,
  getUserAccountFundCreditsReducer,
  toggleAccountFundReducer,
  disableAccountFundReducer,
  verifyOtpAccountFundReducer,
  setMaxFundReducer,
  setMaxUsdFundReducer,
  getUserAccountBalanceReducer,
  userAccountFundListReducer,
  getUserUsdAccountFundCreditsReducer,
  getUserUsdAccountFundDebitsReducer,
} from "./reducers/AccountFundReducers";

import {
  cancelPromiseReducer,
  getAllPromiseReducer,
  settleDisputedPromiseReducer,
  getBuyerpromiseReducer,
  getSellerPromiseReducer,
  buyerConfirmPromiseReducer,
  sellerConfirmPromiseReducer,
  // createPromiseMessagesReducer,
  buyerCreatePromiseMessageReducer,
  sellerCreatePromiseMessageReducer,
  // listPromiseMessagesReducer,
  listBuyerPromiseMessagesReducer,
  listSellerPromiseMessagesReducer,
  buyerClearPromiseMessageReducer,
  sellerClearPromiseMessageReducer,
} from "./reducers/PromiseReducers";

import {
  getUserProfileReducer,
  changePasswordReducer,
  updateUserProfileReducer,
  deleteUserProfileReducer,
  updateUserAvatarReducer,
  sendPasswordResetLinkReducer,
  resetPasswordReducer,
} from "./reducers/userProfileReducers";

import {
  emailOtpSendReducer,
  emailOtpVerifyReducer,
} from "./reducers/emailOtpReducers";

import {
  creditPointBalanceReducer,
  creditPointRequestCreateReducer,
} from "./reducers/creditPointReducers";

import {
  createSupportTicketReducer,
  createSupportMessageReducer,
  listSupportTicketReducer,
  listSupportMessageReducer,
  replySupportTicketReducer,
  adminReplySupportTicketReducer,
  listSupportTicketReplyReducer,
  ticketDetailListReducer,
  allTicketListReducer,
  allTicketResponseReducer,
  clearUserSupportMsgCounterReducer,
  clearAdminSupportMsgCounterReducer,
} from "./reducers/supportReducers";

import {
  feedbackCreateReducer,
  feedbackListReducer,
} from "./reducers/feedbackReducers";

import { referralReducer } from "./reducers/promoReducer";
import { orderListReducer } from "./reducers/orderReducers"; 

const rootReducer = combineReducers({
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  updateUserLastLoginState: updateUserLastLoginReducer,

  emailOtpSend: emailOtpSendReducer,
  emailOtpVerify: emailOtpVerifyReducer,

  userProfile: getUserProfileReducer,
  updateProfile: updateUserProfileReducer,
  userChangePassword: changePasswordReducer,
  deleteProfile: deleteUserProfileReducer,
  updateUserAvatar: updateUserAvatarReducer,
  sendPasswordResetLink: sendPasswordResetLinkReducer,
  resetPassword: resetPasswordReducer,
  referral: referralReducer,

  userTransactions: userTransactionReducer,
  createTransactionState: createTransactionReducer,
  userPayouts: userPayoutReducer,

  fundAccountState: fundAccountReducer,
  getUserAccountFundDebitsState: getUserAccountFundDebitsReducer,
  getAllAccountFundBalanceState: getAllAccountFundBalanceReducer,
  activateAccountFundState: activateAccountFundReducer,

  getUserUsdAccountFundBalanceState: getUserUsdAccountFundBalanceReducer,
  toggleUsdAccountFundState: toggleUsdAccountFundReducer,
  fundUsdAccountState: fundUsdAccountReducer,

  getUserUsdAccountFundCreditsState: getUserUsdAccountFundCreditsReducer,
  getUserUsdAccountFundDebitsState: getUserUsdAccountFundDebitsReducer,

  getUserAccountFundCreditsState: getUserAccountFundCreditsReducer,
  toggleAccountFundState: toggleAccountFundReducer,
  disableAccountFundState: disableAccountFundReducer,
  verifyOtpAccountFundState: verifyOtpAccountFundReducer,
  setMaxFundState: setMaxFundReducer,
  setMaxUsdFundState: setMaxUsdFundReducer,
  userAccountBalanceState: getUserAccountBalanceReducer,
  userAccountFundListState: userAccountFundListReducer,
  getBuyerPromiseState: getBuyerpromiseReducer,
  getSellerPromiseState: getSellerPromiseReducer,
  buyerConfirmPromiseState: buyerConfirmPromiseReducer,
  sellerConfirmPromiseState: sellerConfirmPromiseReducer,

  cancelPromiseState: cancelPromiseReducer,
  getAllPromiseState: getAllPromiseReducer,
  settleDisputedPromiseState: settleDisputedPromiseReducer,
  // createPromiseMessageState: createPromiseMessagesReducer,
  buyerCreatePromiseMessageState: buyerCreatePromiseMessageReducer,
  sellerCreatePromiseMessageState: sellerCreatePromiseMessageReducer,
  // listPromiseMessageState: listPromiseMessagesReducer,

  listBuyerPromiseMessagesState: listBuyerPromiseMessagesReducer,
  listSellerPromiseMessagesState: listSellerPromiseMessagesReducer,
  buyerClearPromiseMessageState: buyerClearPromiseMessageReducer,
  sellerClearPromiseMessageState: sellerClearPromiseMessageReducer,

  creditPointBal: creditPointBalanceReducer,
  creditPointRequestCreate: creditPointRequestCreateReducer,

  createSellerAccountState: sellerAccountReducer,
  getSellerAccountState: getSellerAccountReducer,
  updateSellerAccountState: updateSellerAccountReducer,

  createBusinessStatusState: createBusinessStatusReducer,
  getBusinessStatusState: getBusinessStatusReducer,
  updateBusinessStatusState: updateBusinessStatusReducer,

  getBusinessOwnerDetailsState: getBusinessOwnerDetailsReducer,
  updateBusinessOwnerDetailsState: updateBusinessOwnerDetailsReducer,
  getBankAccountState: getBankAccountReducer,
  updateBankAccountState: updateBankAccountReducer,
  getSellerBvnState: getSellerBvnReducer,
  updateSellerBvnState: updateSellerBvnReducer,
  getSellerPhotoState: getSellerPhotoReducer,
  updateSellerPhotoState: updateSellerPhotoReducer,

  businessOwnerDetailState: businessOwnerDetailReducer,
  sellerBankAccountState: sellerBankAccountReducer,
  sellerBvnState: sellerBvnReducer,
  sellerPhotoState: sellerPhotoReducer,

  orderList: orderListReducer,

  selecteCurrencyState: selecteCurrencyReducer,
  getSelectedCurrencyState: getSelectedCurrencyReducer,

  createSupportTicketState: createSupportTicketReducer,
  adminReplySupportTicketState: adminReplySupportTicketReducer,
  createSupportMessageState: createSupportMessageReducer,
  listSupportTicketState: listSupportTicketReducer,
  listSupportMessageState: listSupportMessageReducer,
  replySupportTicketState: replySupportTicketReducer,
  listSupportTicketReplyState: listSupportTicketReplyReducer,
  ticketDetailList: ticketDetailListReducer,
  allTicketList: allTicketListReducer,
  allTicketResponse: allTicketResponseReducer,
  clearUserSupportMsgCounterState: clearUserSupportMsgCounterReducer,
  clearAdminSupportMsgCounterState: clearAdminSupportMsgCounterReducer,

  feedbackCreate: feedbackCreateReducer,
  feedbackList: feedbackListReducer,

  messagingState: messagingReducer,
  sendEmailState: sendEmailReducer,
  clearMessageCounterState: clearMessageCounterReducer,
  getUserMessagesState: getUserMessagesReducer,
});

// Function to initialize the store asynchronously
export const initializeStore = async () => {
  // // Get cartItems from AsyncStorage
  // const getCartItems = async () => {
  //   try {
  //     const cartItems = await AsyncStorage.getItem("cartItems");
  //     return cartItems ? JSON.parse(cartItems) : [];
  //   } catch (error) {
  //     console.error("Error getting cart items from AsyncStorage:", error);
  //     return [];
  //   }
  // };

  // Get userInfo from AsyncStorage
  const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error("Error getting user info from AsyncStorage:", error);
      return null;
    }
  };

  // Get userRegister data from AsyncStorage
  const getUserRegisterData = async () => {
    try {
      const registerData = await AsyncStorage.getItem("registerData");
      return registerData ? JSON.parse(registerData) : null;
    } catch (error) {
      console.error("Error getting register data from AsyncStorage:", error);
      return null;
    }
  };

  // Initial state with data from AsyncStorage
  const initialState = {
    // cart: { cartItems: await getCartItems() },
    userLogin: { userInfo: await getUserInfo() },
    userRegister: { registerData: await getUserRegisterData() },
  };

  // Create and return the Redux store 
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};
