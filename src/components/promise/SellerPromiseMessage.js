// SellerPromiseMessage.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  sellerCreatePromiseMessage,
  resetSellerCreatePromiseMessageState,
  listSellerPromiseMessages,
} from "../../redux/actions/PromiseActions";
import Loader from "../../Loader";
import Message from "../../Message";

const SellerPromiseMessage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(listSellerPromiseMessages(id));
      setMessage("");
      setRefreshing(false);
    }, 2000);
  }, [dispatch, id]);

  const sellerCreatePromiseMessageState = useSelector(
    (state) => state.sellerCreatePromiseMessageState
  );
  const { loading, success, error } = sellerCreatePromiseMessageState;

  const listSellerPromiseMessagesState = useSelector(
    (state) => state.listSellerPromiseMessagesState
  );
  const { sellerPromiseMessages } = listSellerPromiseMessagesState;

  useEffect(() => {
    dispatch(listSellerPromiseMessages(id));
  }, [dispatch, id]);

  const handleSubmitReply = () => {
    const promiseMessageData = {
      promise_id: id,
      message: message,
    };

    dispatch(sellerCreatePromiseMessage(promiseMessageData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetSellerCreatePromiseMessageState());
        onRefresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success, onRefresh]);

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isFirstMessageOfDay = (currentIndex, messages) => {
    if (currentIndex === 0) return true;

    const currentDate = new Date(messages[currentIndex].timestamp);
    const prevDate = new Date(messages[currentIndex - 1].timestamp);

    if (currentDate.toLocaleDateString() !== prevDate.toLocaleDateString()) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (currentDate.toLocaleDateString() === today.toLocaleDateString()) {
        return "Today";
      } else if (
        currentDate.toLocaleDateString() === yesterday.toLocaleDateString()
      ) {
        return "Yesterday";
      } else {
        return currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }
    return false;
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.header}>Promise ID: {id}</Text>

          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}

          {sellerPromiseMessages?.map((message, index) => (
            <View key={message.id}>
              {isFirstMessageOfDay(index, sellerPromiseMessages) && (
                <Text style={styles.dateLabel}>
                  {new Date(message.timestamp).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              )}
              <View
                style={[
                  styles.messageItem,
                  message.buyer ? styles.buyerMessage : styles.sellerMessage,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    message.buyer ? styles.buyerBubble : styles.sellerBubble,
                  ]}
                >
                  <Text style={styles.username}>
                    <FontAwesomeIcon icon={faUser} />{" "}
                    {message.buyer_username
                      ? message.buyer_username.charAt(0).toUpperCase() +
                        message.buyer_username.slice(1)
                      : message.seller_username.charAt(0).toUpperCase() +
                        message.seller_username.slice(1)}
                  </Text>
                  <Text>{message.message}</Text>
                  <Text style={styles.timestamp}>
                    {formatTimestamp(message.timestamp)}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {success && (
            <Message variant="success">Message sent successfully.</Message>
          )}

          <View style={styles.replyForm}>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Type your message"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.formGroup}>
            <TouchableOpacity onPress={handleSubmitReply} disabled={loading}>
              <Text style={styles.roundedPrimaryBtn}>
                Send <FontAwesomeIcon icon={faPaperPlane} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  messageContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  messageItem: {
    marginBottom: 10,
    maxWidth: "75%",
  },
  sellerMessage: {
    alignSelf: "flex-end",
  },
  buyerMessage: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
  },
  sellerBubble: {
    backgroundColor: "#f8f9fa",
  },
  buyerBubble: {
    backgroundColor: "#28a745",
  },
  username: {
    fontWeight: "bold",
  },
  timestamp: {
    textAlign: "right",
    fontSize: 10,
  },
  dateLabel: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    color: "#888",
    marginVertical: 5,
  },
  replyForm: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default SellerPromiseMessage;
