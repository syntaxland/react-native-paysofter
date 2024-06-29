// SupportMessage.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { listSupportTicket, listSupportMessage } from "../../redux/actions/supportActions";
import Message from "../../Message";
import Loader from "../../Loader";
import Pagination from "../../Pagination";

const SupportMessage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const listSupportTicketState = useSelector(
    (state) => state.listSupportTicketState
  );
  const { loading, success, tickets, error } = listSupportTicketState;

  const listSupportMessageState = useSelector(
    (state) => state.listSupportMessageState
  );
  const {
    loading: listSupportMessageloading,
    ticketMessages,
    error: listSupportMessageError,
  } = listSupportMessageState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ticketMessages
    ? ticketMessages.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    dispatch(listSupportTicket());
    dispatch(listSupportMessage());
  }, [dispatch]);

  const handleCreateTicket = () => {
    navigation.navigate("Create Support Message");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>
            <Text style={styles.icon}>🎫</Text> Support Ticket
          </Text>
          {loading || listSupportMessageloading ? (
            <Loader />
          ) : error || listSupportMessageError ? (
            <Message variant="danger">{error || listSupportMessageError}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <Text style={styles.noTicketsText}>
                  Support Ticket appear here.
                </Text>
              ) : (
                <ScrollView horizontal={true}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>SN</DataTable.Title>
                      <DataTable.Title>Ticket ID</DataTable.Title>
                      <DataTable.Title>User</DataTable.Title>
                      <DataTable.Title>Subject</DataTable.Title>
                      <DataTable.Title>Category</DataTable.Title>
                      <DataTable.Title>Message</DataTable.Title>
                      <DataTable.Title>Status</DataTable.Title>
                      <DataTable.Title>Resolved</DataTable.Title>
                      <DataTable.Title>Created At</DataTable.Title>
                    </DataTable.Header>
                    {currentItems.map((ticket, index) => (
                      <DataTable.Row key={ticket.id}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>{ticket.ticket_id}</DataTable.Cell>
                        <DataTable.Cell>{ticket.email}</DataTable.Cell>
                        <DataTable.Cell>{ticket.subject}</DataTable.Cell>
                        <DataTable.Cell>{ticket.category}</DataTable.Cell>
                        <DataTable.Cell>{ticket.message}</DataTable.Cell>
                        <DataTable.Cell>
                          {ticket.is_closed ? (
                            <Text style={{ color: "red" }}>Closed</Text>
                          ) : (
                            <Text style={{ color: "green" }}>Active</Text>
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell>
                          {ticket.is_resolved ? (
                            <Text style={{ color: "green" }}>Resolved</Text>
                          ) : (
                            <Text style={{ color: "red" }}>Not Resolved</Text>
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell>
                          {new Date(ticket.created_at).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </ScrollView>
              )}
              <View style={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(ticketMessages.length / itemsPerPage)}
                  paginate={paginate}
                />
              </View>
            </>
          )}
          <View style={styles.createTicketButton}>
            <Button mode="contained" onPress={handleCreateTicket}>
              Create A New Support Ticket
            </Button>
          </View>
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
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
  },
  noTicketsText: {
    textAlign: "center",
    paddingTop: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  createTicketButton: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default SupportMessage;
