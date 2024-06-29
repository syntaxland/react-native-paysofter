// BuyerPromiseMsgInbox.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import RenderHtml from "react-native-render-html";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import {
  clearBuyerMessageCounter,
  getBuyerPromises,
} from "../../redux/actions/PromiseActions";
import Loader from "../../Loader";
import Message from "../../Message";
import { Pagination } from "../../Pagination";

const BuyerPromiseMsgInbox = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const getBuyerPromiseState = useSelector(
    (state) => state.getBuyerPromiseState
  );
  const { loading, promises, error } = getBuyerPromiseState;

  const buyerMsgCounted = promises?.reduce(
    (total, userMessages) => total + userMessages.buyer_msg_count,
    0
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = promises?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [expandedMessages, setExpandedMessages] = useState([]);

  const expandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  const clearMessageCounter = (promiseId) => {
    const promiseMessageData = {
      promise_id: promiseId,
    };
    dispatch(clearBuyerMessageCounter(promiseMessageData));
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getBuyerPromises());
  }, [dispatch]);

  const handleNavigateToMessage = (message) => {
    clearMessageCounter(message.promise_id);
    navigation.navigate("Buyer Promise Message", {
      promiseId: message.promise_id,
    });
  };

  const renderItem = ({ item: message }) => (
    <View style={styles.messageItem} key={message.id}>
      <Text style={styles.title}>{message?.subject}</Text>
      <Text style={styles.subtitle}>
        <FontAwesomeIcon icon={faUser} /> {message?.seller_username} |{" "}
        {message.promise_id}
      </Text>
      <RenderHtml
        contentWidth={300}
        source={{
          html: expandedMessages?.includes(message.id)
            ? message.message
            : `${message.message?.split(" ")?.slice(0, 10)?.join(" ")}...`,
        }}
      />
      {!expandedMessages.includes(message.id) && (
        <TouchableOpacity onPress={() => expandMessage(message.id)}>
          <Text style={styles.link}>Read More</Text>
        </TouchableOpacity>
      )}
      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {new Date(message?.modified_at).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
        <TouchableOpacity
          onPress={() => handleNavigateToMessage(message)}
          style={styles.roundedPrimaryBtn}
        >
          <Text style={styles.btnText}>
            Message Seller{" "}
            {message?.buyer_msg_count > 0 && (
              <Text style={styles.msgCounter}>{message?.buyer_msg_count}</Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {currentItems?.length > 0 && (
          <>
            <Text style={styles.header}>
              <FontAwesomeIcon icon={faMessage} /> Buyer Inbox{" "}
              {buyerMsgCounted > 0 && (
                <Text style={styles.msgCounterHeader}>({buyerMsgCounted})</Text>
              )}
            </Text>
            {error && <Message variant="danger">{error}</Message>}
            {loading ? (
              <Loader />
            ) : (
              <>
                {currentItems?.length === 0 ? (
                  <Text style={styles.empty}>
                    Buyer promise inbox messages appear here.
                  </Text>
                ) : (
                  currentItems?.map((item) => renderItem({ item }))
                )}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={promises?.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    padding: 20,
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
  },
  link: {
    color: "#007bff",
    marginTop: 5,
  },
  replyMsg: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  msgCounter: {
    fontSize: 12,
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    padding: 6,
    borderRadius: 50,
    marginLeft: 5,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: "center",
  },
  btnText: {
    color: "#fff",
  },
});

export default BuyerPromiseMsgInbox;
