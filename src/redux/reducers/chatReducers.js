import * as actionTypes from '../constants/chatConstants';

const initialState = {
  connected: false,
  messages: [],
  error: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHAT_CONNECT_SUCCESS:
      return { ...state, connected: true, error: null };

    case actionTypes.CHAT_CONNECT_FAIL:
      return { ...state, error: action.payload };

    case actionTypes.CHAT_MESSAGE_RECEIVED:
      return { ...state, messages: [...state.messages, action.payload] };

    case actionTypes.CHAT_SEND_MESSAGE_FAIL:
      return { ...state, error: action.payload };

    case actionTypes.CHAT_DISCONNECTED:
      return { ...initialState, connected: false };

    default:
      return state;
  }
};

  



// import * as actionTypes from '../constants/chatConstants';

// export const chatReducer = (state = { connected: false, messages: [], error: null }, action) => {
//   switch (action.type) {
//     case actionTypes.CHAT_CONNECT_SUCCESS:
//       return { ...state, connected: true, error: null };

//     case actionTypes.CHAT_CONNECT_FAIL:
//       return { ...state, error: action.payload };

//     case actionTypes.CHAT_MESSAGE_RECEIVED:
//       return { ...state, messages: [...state.messages, action.payload] };

//     case actionTypes.CHAT_SEND_MESSAGE_FAIL:
//       return { ...state, error: action.payload };

//     case actionTypes.CHAT_DISCONNECTED:
//       return { connected: false, messages: [], error: null };

//     default:
//       return state;
//   }
// };
