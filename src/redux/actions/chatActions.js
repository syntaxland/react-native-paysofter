import * as actionTypes from '../constants/chatConstants';
import { socket } from '../services/socketService';

export const connectChat = () => async (dispatch) => {
  try {
    socket.connect(); // Connect to the WebSocket server

    socket.on('connect', () => {
      dispatch({ type: actionTypes.CHAT_CONNECT_SUCCESS });
    });

    socket.on('message', (message) => {
      dispatch({
        type: actionTypes.CHAT_MESSAGE_RECEIVED,
        payload: message,
      });
    });

    socket.on('disconnect', () => {
      dispatch({ type: actionTypes.CHAT_DISCONNECTED });
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CHAT_CONNECT_FAIL,
      payload: error.message,
    });
  }
};

export const sendMessage = (message) => async (dispatch) => {
  try {
    socket.emit('send_message', message); // Send the message to the server
  } catch (error) {
    dispatch({
      type: actionTypes.CHAT_SEND_MESSAGE_FAIL,
      payload: error.message,
    });
  }
};

export const receiveMessage = (message) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.CHAT_MESSAGE_RECEIVED,
      payload: message,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CHAT_RECEIVE_MESSAGE_FAIL,
      payload: error.message,
    });
  }
};
