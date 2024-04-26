// Transactions.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { getUserTransactions } from "../../redux/actions/transactionActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";

function Transactions() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const userTransactions = useSelector((state) => state.userTransactions);
  const { loading, transactions, error } = userTransactions;
  console.log("Transactions:", transactions);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getUserTransactions());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center py-3">
        <i className="fas fa-money-check-alt"></i> Transactions
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <> 
          {currentItems.length === 0 ? (
            <div className="text-center py-3">Transactions appear here.</div>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Payment ID</th>
                  <th>Seller</th>
                  <th>Payer</th> 
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Currency</th>
                  <th>Successful</th>
                  <th>Payment Provider</th>
                  <th>Transaction ID</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{index + 1}</td>
                    <td>{transaction.payment_id}</td>
                    <td>
                      <td>{transaction.seller_email}</td>
                    </td>
                    <td>{transaction.buyer_email}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.payment_method}</td>
                    <td>{transaction.currency}</td>
                    <td>
                      {transaction.is_success ? (
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: "16px", color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times-circle"
                          style={{ fontSize: "16px", color: "red" }} 
                        ></i>
                      )}
                    </td>
                    <td>{transaction.payment_provider}</td>
                    <td>{transaction.transaction_id}</td>
                    <td>
                      {new Date(transaction.timestamp).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={transactions.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default Transactions;
