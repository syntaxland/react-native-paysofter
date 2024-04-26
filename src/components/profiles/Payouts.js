// Payouts.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { getUserPayouts } from "../../redux/actions/payoutActions"; 
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";

function Payouts() {
  const dispatch = useDispatch();

  const userPayouts = useSelector((state) => state.userPayouts);
  const { loading, payouts, error } = userPayouts;
  console.log("Payouts:", payouts);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payouts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getUserPayouts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center py-3">
        <i className="fas fa-credit-card"></i> Payouts
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <div className="text-center py-3">Payouts appear here.</div>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Payment ID</th>
                  <th>User</th>
                  {/* <th>Payer</th> */}
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Currency</th>
                  <th>Status</th>
                  <th>Payment Provider</th>
                  <th>Payout ID</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((payout, index) => (
                  <tr key={payout.id}>
                    <td>{index + 1}</td>
                    <td>{payout.payment_id}</td>
                    <td>
                      <td>{payout.seller_email}</td>
                    </td>
                    {/* <td>{payout.buyer_email}</td> */}
                    <td>{payout.amount}</td>
                    <td>{payout.payment_method}</td>
                    <td>{payout.currency}</td>
                    <td>
                      {payout.is_success ? (
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
                    <td>{payout.payment_provider}</td>
                    <td>{payout.payout_id}</td>
                    <td>
                      {new Date(payout.timestamp).toLocaleString("en-US", {
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
            totalItems={payouts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default Payouts;
