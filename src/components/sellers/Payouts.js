// Payouts.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCreditCard,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { getUserPayouts } from "../../redux/actions/payoutActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { DataTable, Card } from "react-native-paper";
import { Pagination } from "../../Pagination";
import { formatAmount } from "../../FormatAmount";

const Payouts = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userPayouts = useSelector((state) => state.userPayouts);
  const { loading, payouts, error } = userPayouts;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payouts?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(payouts?.length / itemsPerPage);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getUserPayouts());
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserPayouts());
  }, [dispatch]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.header}>
                  <FontAwesomeIcon icon={faCreditCard} /> Payouts
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
              {currentItems.length === 0 ? (
                <Text style={styles.noData}>Payouts appear here.</Text>
              ) : (
                <ScrollView horizontal={true}>
                  <View style={styles.cardContainer}>
                    <Card style={styles.card}>
                      <Card.Content>
                        <DataTable>
                          <DataTable.Header>
                            <DataTable.Title style={styles.snHeaderCell}>
                              SN
                            </DataTable.Title>
                            <DataTable.Title style={styles.headerCell}>
                              Payment ID
                            </DataTable.Title>
                            <DataTable.Title style={styles.userHeaderCell}>
                              User
                            </DataTable.Title>
                            <DataTable.Title style={styles.headerCell}>
                              Amount
                            </DataTable.Title>
                            <DataTable.Title style={styles.headerCell}>
                              Payment Method
                            </DataTable.Title>
                            <DataTable.Title style={styles.headerCell}>
                              Currency
                            </DataTable.Title>
                            <DataTable.Title style={styles.headerCell}>
                              Status
                            </DataTable.Title>
                            <DataTable.Title style={styles.headerCell}>
                              Payment Provider
                            </DataTable.Title>
                            <DataTable.Title style={styles.headerCell}>
                              Payout ID
                            </DataTable.Title>
                            <DataTable.Title style={styles.dateHeaderCell}>
                              Created At
                            </DataTable.Title>
                          </DataTable.Header>

                          {currentItems.map((payout, index) => (
                            <DataTable.Row key={payout.id}>
                              <DataTable.Cell style={styles.snCell}>
                                {indexOfFirstItem + index + 1}
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.cell}>
                                <ScrollView horizontal>
                                  <Text>{payout.payment_id}</Text>
                                </ScrollView>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.userCell}>
                                <ScrollView horizontal>
                                  <Text>{payout.seller_email}</Text>
                                </ScrollView>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.cell}>
                                <ScrollView horizontal>
                                  <Text style={{ color: "green" }}>
                                    {formatAmount(payout.amount)}{" "}
                                    {payout.currency}
                                  </Text>
                                </ScrollView>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.cell}>
                                <ScrollView horizontal>
                                  <Text>{payout.payment_method}</Text>
                                </ScrollView>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.cell}>
                                <ScrollView horizontal>
                                  <Text>{payout.currency}</Text>
                                </ScrollView>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.cell}>
                                <ScrollView horizontal>
                                  {payout.is_success ? (
                                    <Text style={{ color: "green" }}>
                                      <FontAwesomeIcon
                                        color="green"
                                        icon={faCheckCircle}
                                      />{" "}
                                      Yes
                                    </Text>
                                  ) : (
                                    <Text style={{ color: "red" }}>
                                      <FontAwesomeIcon
                                        color="red"
                                        icon={faTimesCircle}
                                      />{" "}
                                      No
                                    </Text>
                                  )}
                                </ScrollView>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.cell}>
                                <ScrollView horizontal>
                                  <Text>{payout.payment_provider}</Text>
                                </ScrollView>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.cell}>
                                <ScrollView horizontal>
                                  <Text>{payout.payout_id}</Text>
                                </ScrollView>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.dateCell}>
                                <ScrollView horizontal>
                                  <Text>
                                    {new Date(payout.timestamp).toLocaleString(
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
                            </DataTable.Row>
                          ))}
                        </DataTable>
                      </Card.Content>
                    </Card>
                  </View>
                </ScrollView>
              )}

              <View style={styles.pagination}>
                <Card style={styles.card}>
                  <Card.Content>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      paginate={handlePagination}
                    />
                  </Card.Content>
                </Card>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  noData: {
    textAlign: "center",
    marginVertical: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  headerCell: {
    width: 150,
    marginLeft: 20,
    borderRightWidth: 1,
    borderColor: "black",
  },
  cell: {
    width: 150,
    marginLeft: 10,
  },
  snHeaderCell: {
    width: 50,
    borderRightWidth: 1,
    borderColor: "black",
  },
  snCell: {
    width: 50,
  },
  dateHeaderCell: {
    width: 250,
    borderRightWidth: 1,
    borderColor: "black",
    marginLeft: 20,
  },
  dateCell: {
    width: 250,
    marginLeft: 10,
  },
  userHeaderCell: {
    width: 250,
    borderRightWidth: 1,
    borderColor: "black",
    marginLeft: 20,
  },
  userCell: {
    width: 250,
    marginLeft: 10,
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
});

export default Payouts;
