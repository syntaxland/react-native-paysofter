// PaysofterPromiseBuyer.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { DataTable, Card } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMoneyCheckAlt,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import {
  getBuyerPromises,
  clearBuyerMessageCounter,
} from "../../redux/actions/PromiseActions";
import BuyerConfirmPromise from "../promise/BuyerConfirmPromise";
import SettleDisputedPromise from "../promise/SettleDisputedPromise";
import { formatAmount } from "../../FormatAmount";
import Message from "../../Message";
import Loader from "../../Loader";
import Timer from "../../Timer";
import { Pagination } from "../../Pagination";

function PaysofterPromiseBuyer() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const getBuyerPromiseState = useSelector(
    (state) => state.getBuyerPromiseState
  );
  const { loading, promises, error } = getBuyerPromiseState;
  console.log("Promises:", promises);

  const [showConfirmPromise, setShowConfirmPromise] = useState(false);
  const [showSettleDispute, setShowSettleDispute] = useState(false);
  const [selectedPromise, setSelectedPromise] = useState(null);

  const handleConfirmPromiseOpen = (promise) => {
    setSelectedPromise(promise);
    setShowConfirmPromise(true);
  };

  const handleConfirmPromiseClose = () => {
    setShowConfirmPromise(false);
  };

  const handleSettleDisputeOpen = (promise) => {
    setSelectedPromise(promise);
    setShowSettleDispute(true);
  };

  const handleSettleDisputeClose = () => {
    setShowSettleDispute(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = promises?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(promises?.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatAccountId = (accountId) => {
    const accountIdStr = String(accountId);

    if (accountIdStr?.length < 8) {
      return accountIdStr;
    } else {
      const maskedPart =
        "*".repeat(accountIdStr?.length - 4) + accountIdStr?.slice(-4);
      return maskedPart;
    }
  };

  const clearMessageCounter = (promiseId) => {
    const promiseMessageData = {
      promise_id: promiseId,
    };
    dispatch(clearBuyerMessageCounter(promiseMessageData));
  };

  const handleSendMessage = (promise) => {
    const queryParams = {
      id: promise?.promise_id,
      // id: promise?.promise_id,
    };

    navigation.navigate("Buyer Promise Message", {
      id: promise.id,
      ...queryParams,
    });
  };

  useEffect(() => {
    dispatch(getBuyerPromises());
  }, [dispatch]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => dispatch(getBuyerPromises())}
        />
      }
      contentContainerStyle={styles.scrollView}
    >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>
                <FontAwesomeIcon icon={faMoneyCheckAlt} /> Promises (Buyer)
              </Text>
            </Card.Content>
          </Card>
        </View>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <ScrollView horizontal={true}>
              <View style={styles.cardContainer}>
                <Card style={styles.card}>
                  <Card.Content>
                    {currentItems?.length === 0 ? (
                      <View style={styles.noData}>
                        <Text style={styles.noDataContainer}>
                          Promises appear here.
                        </Text>
                      </View>
                    ) : (
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title style={styles.snHeaderCell}>
                            SN
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Promise ID
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Amount
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Seller Account ID
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Buyer Account ID
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Seller Fulfilled
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Buyer Fulfilled
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Status
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Success
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Active
                          </DataTable.Title>
                          <DataTable.Title style={styles.durationHeaderCell}>
                            Settlement Duration
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Conflict Activated
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Conflict Charges
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Delivered
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Cancelled
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Payment Method
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Payment Provider
                          </DataTable.Title>
                          <DataTable.Title style={styles.dateHeaderCell}>
                            Made At
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Promise Action
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Message Action
                          </DataTable.Title>
                        </DataTable.Header>
                        {currentItems.map((promise, index) => (
                          <DataTable.Row
                            key={promise.id}
                            style={styles.headerCard}
                          >
                            <DataTable.Cell style={styles.snCell}>
                              {indexOfFirstItem + index + 1}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              <TouchableOpacity
                                disabled={promise.buyer_promise_fulfilled}
                                // onPress={() =>
                                //   !promise.buyer_promise_fulfilled &&
                                //   handleConfirmPromiseOpen({
                                //     promise_id: promise.promise_id,
                                //     amount: promise.amount,
                                //   })
                                // }
                              >
                                <Text style={styles.promiseIdContainer}>
                                  {promise.promise_id}
                                </Text>
                              </TouchableOpacity>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              <Text
                                style={{
                                  color: promise.buyer_promise_fulfilled
                                    ? "green"
                                    : promise.is_cancelled
                                    ? "red"
                                    : "orange",
                                }}
                              >
                                {promise.currency}{" "}
                                {formatAmount(promise.amount)}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              {formatAccountId(promise.seller_account_id)}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              {formatAccountId(promise.buyer_account_id)}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              <FontAwesomeIcon
                                icon={
                                  promise.seller_fulfilled_promise
                                    ? faCheckCircle
                                    : faTimesCircle
                                }
                                color={
                                  promise.seller_fulfilled_promise
                                    ? "green"
                                    : "red"
                                }
                              />
                              <Text>
                                {" "}
                                {promise.seller_fulfilled_promise
                                  ? "Yes"
                                  : "No"}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              <FontAwesomeIcon
                                icon={
                                  promise.buyer_promise_fulfilled
                                    ? faCheckCircle
                                    : faTimesCircle
                                }
                                color={
                                  promise.buyer_promise_fulfilled
                                    ? "green"
                                    : "red"
                                }
                              />
                              <Text>
                                {" "}
                                {promise.buyer_promise_fulfilled ? "Yes" : "No"}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              {promise.status}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              <FontAwesomeIcon
                                icon={
                                  promise.is_success
                                    ? faCheckCircle
                                    : faTimesCircle
                                }
                                color={promise.is_success ? "green" : "red"}
                              />
                              <Text> {promise.is_success ? "Yes" : "No"}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              <FontAwesomeIcon
                                icon={
                                  promise.is_active
                                    ? faCheckCircle
                                    : faTimesCircle
                                }
                                color={promise.is_active ? "green" : "red"}
                              />
                              <Text> {promise.is_active ? "Yes" : "No"}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.durationCell}>
                              <ScrollView>
                                <Text style={{ color: "blue", padding: 5 }}>
                                  {promise.duration}
                                </Text>
                                <Text style={{ padding: 2 }}>
                                  {promise.is_active ? (
                                    <TouchableOpacity disabled>
                                      <Text style={styles.squaredSuccessBtn}>
                                        Timer:{" "}
                                        <Timer
                                          expirationDate={
                                            promise?.expiration_date
                                          }
                                        />
                                      </Text>
                                    </TouchableOpacity>
                                  ) : promise.buyer_promise_fulfilled ? (
                                    <TouchableOpacity disabled>
                                      <Text
                                        style={{ color: "green", padding: 5 }}
                                      >
                                        Promise Settled
                                      </Text>
                                    </TouchableOpacity>
                                  ) : null}
                                </Text>
                                <Text style={{ padding: 2 }}>
                                  {new Date(promise.expiration_date) <
                                    new Date() &&
                                    !promise.buyer_promise_fulfilled && (
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleSettleDisputeOpen({
                                            promise_id: promise.promise_id,
                                          })
                                        }
                                      >
                                        <Text style={styles.roundedDangerBtn}>
                                          Settle Dispute
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                </Text>
                                {promise.is_settle_conflict_activated && (
                                  <TouchableOpacity disabled>
                                    <Text style={{ color: "red", padding: 5 }}>
                                      Settle Conflict Activated
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </ScrollView>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              <FontAwesomeIcon
                                icon={
                                  promise.is_settle_conflict_activated
                                    ? faCheckCircle
                                    : faTimesCircle
                                }
                                color={
                                  promise.is_settle_conflict_activated
                                    ? "green"
                                    : "red"
                                }
                              />
                              <Text>
                                {" "}
                                {promise.is_settle_conflict_activated
                                  ? "Yes"
                                  : "No"}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              {promise.currency}{" "}
                              {promise.settle_conflict_charges}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              <FontAwesomeIcon
                                icon={
                                  promise.is_delivered
                                    ? faCheckCircle
                                    : faTimesCircle
                                }
                                color={promise.is_delivered ? "green" : "red"}
                              />
                              <Text>
                                {" "}
                                {promise.is_delivered ? "Yes" : "No"}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              <FontAwesomeIcon
                                icon={
                                  promise.is_cancelled
                                    ? faCheckCircle
                                    : faTimesCircle
                                }
                                color={promise.is_cancelled ? "green" : "red"}
                              />
                              <Text>
                                {" "}
                                {promise.is_cancelled ? "Yes" : "No"}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              {promise.payment_method}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              {promise.payment_provider}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.dateCell}>
                              <ScrollView horizontal>
                                <Text>
                                  {new Date(promise.timestamp).toLocaleString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      second: "numeric",
                                    }
                                  )}
                                </Text>
                              </ScrollView>
                            </DataTable.Cell>

                            <DataTable.Cell style={styles.cell}>
                              {promise.is_cancelled ? (
                                <TouchableOpacity disabled>
                                  <Text style={{ color: "red" }}>
                                    Promise Cancelled
                                  </Text>
                                </TouchableOpacity>
                              ) : promise.buyer_promise_fulfilled ? (
                                <TouchableOpacity disabled>
                                  <Text style={styles.roundedSuccessBtn}>
                                    Promise Confirmed{" "}
                                    <FontAwesomeIcon
                                      icon={faCheckCircle}
                                      color="green"
                                    />
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() =>
                                    handleConfirmPromiseOpen({
                                      promise_id: promise.promise_id,
                                      amount: promise.amount,
                                    })
                                  }
                                >
                                  <Text style={styles.roundedPrimaryBtn}>
                                    Confirm Promise
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </DataTable.Cell>

                            <DataTable.Cell style={styles.cell}>
                              <TouchableOpacity
                                onPress={() => {
                                  handleSendMessage(promise);
                                  clearMessageCounter(promise.promise_id);
                                }}
                              >
                                <Text style={styles.roundedPrimaryBtn}>
                                  Message Seller
                                  {promise?.buyer_msg_count > 0 && (
                                    <Text style={{ color: "red" }}>
                                      {" "}
                                      ({promise?.buyer_msg_count})
                                    </Text>
                                  )}
                                </Text>
                              </TouchableOpacity>
                            </DataTable.Cell>
                          </DataTable.Row>
                        ))}
                      </DataTable>
                    )}
                  </Card.Content>
                </Card>
              </View>
            </ScrollView>

            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <Card.Content>
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    paginate={handlePagination}
                  />
                </Card.Content>
              </Card>
            </View>
          </>
        )}
      </View>

      <Modal
        visible={showConfirmPromise}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Confirm Promise</Text>
            {showConfirmPromise && (
              <BuyerConfirmPromise
                promiseId={selectedPromise?.promise_id}
                amount={selectedPromise?.amount}
                onClose={handleConfirmPromiseClose}
              />
            )}

            <View style={styles.closeBtn}>
              <Button title="Close" onPress={handleConfirmPromiseClose} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSettleDispute}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Settle Disputed Promise</Text>
            {showSettleDispute && (
              <SettleDisputedPromise
                promiseId={selectedPromise?.promise_id}
                amount={selectedPromise?.amount}
                onClose={handleSettleDisputeClose}
              />
            )}

            <View style={styles.closeBtn}>
              <Button title="Close" onPress={handleSettleDisputeClose} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  noDataContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  noData: {
    textAlign: "center",
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    padding: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  headerCell: {
    width: 200,
    marginLeft: 20,
    borderRightWidth: 1,
    borderColor: "black",
  },
  cell: {
    width: 200,
    marginLeft: 20,
  },
  snHeaderCell: {
    width: 20,
    borderRightWidth: 1,
    borderColor: "black",
  },
  snCell: {
    width: 20,
  },
  dateHeaderCell: {
    width: 250,
    borderRightWidth: 1,
    borderColor: "black",
    marginLeft: 20,
  },
  dateCell: {
    width: 250,
    marginLeft: 20,
  },
  durationHeaderCell: {
    width: 200,
    borderRightWidth: 1,
    borderColor: "black",
    marginLeft: 20,
  },
  durationCell: {
    width: 200,

    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  headerCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  cardContainer: {
    padding: 10,
  },
  closeBtn: {
    padding: 10,
    color: "red",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  closeBtnText: {
    color: "red",
  },
  cardContainer: {
    padding: 10,
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
  roundedDangerBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  roundedSuccessBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  squaredSuccessBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  squaredDangerBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  promiseIdContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
    justifyContent: "center",
  },
});

export default PaysofterPromiseBuyer;
