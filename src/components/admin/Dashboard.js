// Dashboard.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { getCreditPointBalance } from "../../redux/actions/creditPointActions";
import { getUserTransactions } from "../../redux/actions/transactionActions";
import { getUserAccountFundBalance } from "../../redux/actions/AccountFundActions";
import { getUserPayouts } from "../../redux/actions/payoutActions";
import { Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
} from "chart.js";
// import ToggleAccountSettings from "../settings/ToggleAccountSettings";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  PointElement
);

function Dashboard() {
  // const [creditPointEarning, setCreditPointEarning] = useState(0);
  const dispatch = useDispatch();
  // const history = useHistory();

  const userTransactions = useSelector((state) => state.userTransactions);
  const {
    loading: transactionLoading,
    error: transactionError,
    transactions,
  } = userTransactions;
  console.log("Transactions:", transactions);

  const creditPointBal = useSelector((state) => state.creditPointBal);
  const {
    loading: creditPointBalanceLoading,
    error: creditPointBalanceError,
    creditPointBalance,
  } = creditPointBal;
  console.log("Credit Point Balance:", creditPointBalance);

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { loading, error, accountFundBalance } = userAccountBalanceState;
  console.log("accountFundBalance:", accountFundBalance);

  const userPayouts = useSelector((state) => state.userPayouts);
  const { loading: payoutLoading, payouts, error: payoutError } = userPayouts;
  console.log("User Dashboard Payouts:", payouts);

  // const [showToggleAccountSettings, setShowToggleAccountSettings] =
  //   useState(false);

  // const [showDisableAccountSettings, setShowDisableAccountSettings] =
  //   useState(false);

  // const handleToggleFundOpen = () => {
  //   setShowToggleAccountSettings(true);
  // };

  // const handleDisableFundOpen = () => {
  //   setShowDisableAccountSettings(true);
  // };

  // const handleDisableFundClose = () => {
  //   setShowDisableAccountSettings(false);
  // };

  // const handleToggleFundClose = () => {
  //   setShowToggleAccountSettings(false);
  // };

  useEffect(() => {
    dispatch(getCreditPointBalance());
    dispatch(getUserTransactions());
    dispatch(getUserPayouts());
    dispatch(getUserAccountFundBalance());
  }, [dispatch]);

  const lineGraphData = {
    labels: transactions?.map((transaction) =>
      new Date(transaction.timestamp).toLocaleString()
    ),
    datasets: [
      {
        label: "Amount Paid (NGN)",
        fill: false,
        bpayoutColor: "rgba(75,192,192,1)",
        bpayoutWidth: 2,
        data: transactions?.map((transaction) => transaction.amount),
        transactionIds: transactions?.map(
          (transaction) => transaction.payment_id
        ),
      },
    ],
  };

  const lineChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            if (label) {
              const index = context.dataIndex;
              const transactionId = context.dataset.transactionIds[index];
              return `${label}: NGN ${context.formattedValue} (${transactionId})`;
            }
            return null;
          },
        },
      },
    },
  };

  const getTotalTransaction = () => {
    let totalPayment = 0;

    transactions.forEach((transaction) => {
      totalPayment += parseFloat(transaction.amount);
    });
    return totalPayment;
  };

  // const creditPoints = creditPointBalance?.balance;
  // const accountBalance = accountFundBalance?.balance;

  // const withdrawCreditPoints =
  //   creditPoints >= 1000 ? (
  //     <Link
  //       to={{
  //         pathname: "/credit-point-request",
  //         search: `?creditPoints=${creditPoints}`,
  //       }}
  //     >
  //       <Button variant="primary" className="rounded">
  //         Withdraw Points
  //       </Button>
  //     </Link>
  //   ) : (
  //     <p>
  //       <Button variant="danger" className="rounded" readOnly>
  //         Maturity from NGN 1,000
  //       </Button>
  //     </p>
  //   );

  // const handleFundAccount = () => {
  //   history.push("/fund-account");
  // };

  // const handleFundAccountSettings = () => {
  //   history.push("/toggle-fund");
  // };

  const paidPayoutRateData = {
    labels: [
      `Paid PayoutsPayouts (${(
        (payouts?.filter((payout) => payout.is_paid)?.length /
          payouts?.length) *
        100
      ).toFixed(1)}%)`,
      `Unpaid PayoutsPayouts (${(
        (payouts?.filter((payout) => !payout.is_paid)?.length /
          payouts?.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          payouts?.filter((payout) => payout.is_paid)?.length,
          payouts?.filter((payout) => !payout.is_paid)?.length,
        ],
        backgroundColor: ["#1F77B4", "#FF6384"],
      },
    ],
  };

  const unfulfilledPayoutRateData = {
    labels: [
      `Delivered Payouts (${(
        (payouts?.filter((payout) => payout.is_approved)?.length /
          payouts?.length) *
        100
      ).toFixed(1)}%)`,
      `Undelivered Payouts (${(
        (payouts?.filter((payout) => !payout.is_approved)?.length /
          payouts?.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          payouts?.filter((payout) => payout.is_approved)?.length,
          payouts?.filter((payout) => !payout.is_approved)?.length,
        ],
        backgroundColor: ["#008000", "#FFA500"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="justify-content-center text-center">
      <Row>
        <Col>
          <div>
            {loading ||
            creditPointBalanceLoading ||
            transactionLoading ||
            payoutLoading ? (
              <Loader />
            ) : error ||
              creditPointBalanceError ||
              transactionError ||
              payoutError ? (
              <Message variant="danger">
                {error ||
                  creditPointBalanceError ||
                  transactionError ||
                  payoutError}
              </Message>
            ) : (
              <div>
                <Row>
                  <Col>
                    <div>
                      <div className="bar-chart">
                        <h2 className="py-2">
                          <i className="	fas fa-money-bill"></i> Total
                          Transactions (Admin Dashboard)
                        </h2>
                        <div className="bar"></div>
                        <strong>
                          NGN{" "}
                          {getTotalTransaction().toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </strong>
                      </div>
                    </div>
                  </Col>
                  {/* <Row className="py-2">

                    <Col>
                      <Row>
                        <Col>
                          <h2 className="py-2">
                            <i className="fas fa-wallet"></i> Account Fund
                            Wallet
                          </h2>{" "}
                          <strong>Staus:</strong>{" "}
                          {accountFundBalance?.is_diabled ? (
                            <>
                              <span className="py-2">
                                <Button
                                  variant="outline-transparent"
                                  onClick={handleDisableFundOpen}
                                  className="rounded"
                                  size="sm"
                                  title="Account Fund is currently disabled. Please contact support."
                                >
                                  <i
                                    className="fas fa-lock"
                                    style={{ fontSize: "16px", color: "red" }}
                                  ></i>{" "}
                                  Disabled
                                </Button>
                              </span>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="outline-transparent"
                                onClick={handleToggleFundOpen}
                                className="rounded"
                                size="sm"
                                title="Set Account Fund active or locked."
                              >
                                {accountFundBalance?.is_active ? (
                                  <>
                                    <i
                                      className="fas fa-lock-open"
                                      style={{
                                        fontSize: "16px",
                                        color: "green",
                                      }}
                                    ></i>{" "}
                                    Active
                                  </>
                                ) : (
                                  <>
                                    <i
                                      className="fas fa-lock"
                                      style={{
                                        fontSize: "16px",
                                        color: "yellow",
                                      }}
                                    ></i>{" "}
                                    Locked
                                  </>
                                )}
                              </Button>
                            </>
                          )}
                        </Col>

                        <Modal
                          show={showToggleAccountSettings}
                          onHide={handleToggleFundClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className="text-center w-100 py-2">
                              Toggle Account Fund Status
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {showToggleAccountSettings && (
                              <ToggleAccountSettings />
                            )}
                          </Modal.Body>
                        </Modal>

                        <Modal
                          show={showDisableAccountSettings}
                          onHide={handleDisableFundClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className="text-center w-100 py-2">
                              Account Fund Disabled
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p className="text-center  py-2">
                              Account Fund is currently disabled. Please contact
                              support for reactivation.
                            </p>
                          </Modal.Body>
                        </Modal>
                      </Row>

                      <p>Account Fund Balance:</p>
                      <strong>
                        NGN{" "}
                        {accountFundBalance?.balance?.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </strong>

                      <div className="py-3">
                        <Button
                          variant="primary"
                          onClick={handleFundAccount}
                          className="rounded"
                        >
                          Fund Account
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <h2 className="py-2">
                        <i className="far fa-money-bill-alt"></i> Credit Point
                        Wallet
                      </h2>
                      <p>Credit Point Balance:</p>
                      <strong>
                        NGN{" "}
                        {creditPoints?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </strong>
                      <div className="py-2">{withdrawCreditPoints}</div>
                    </Col>
                  </Row> */}

                  <hr />
                  {/* <Row>
                    <h2 className="py-3">Services</h2>

                    <hr />

                    <Col>
                      <div className="py-3">
                        <Button
                          variant="primary"
                          // onClick={handleFundAccount}
                          className="rounded"
                        >
                          Airtime <i className="fas fa-phone"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button
                          variant="primary"
                          // onClick={handleFundAccount}
                          className="rounded"
                        >
                          Electricity <i className="fas fa-lightbulb"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button
                          variant="primary"
                          // onClick={handleFundAccount}
                          className="rounded"
                        >
                          Mobile Data <i className="fas fa-wifi"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button
                          variant="primary"
                          // onClick={handleFundAccount}
                          className="rounded"
                        >
                          CableTV <i className="fas fa-television"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button
                          variant="primary"
                          // onClick={handleFundAccount}
                          className="rounded"
                        >
                          Internet <i className="fas fa-globe"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button
                          variant="primary"
                          // onClick={handleFundAccount}
                          className="rounded"
                        >
                          Book Flight <i className="fa fa-plane"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button
                          variant="primary"
                          // onClick={handleFundAccount}
                          className="rounded"
                        >
                          Gaming <i className="fa fa-gamepad"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button
                          variant="primary"
                          // onClick={handleFundAccount}
                          className="rounded"
                        >
                          POS Terminal <i className="fas fa-calculator"></i>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <hr /> */}

                  <div className="line-graph">
                    <h2 className="py-3">Transactions</h2>
                    <hr />
                    <Line data={lineGraphData} options={lineChartOptions} />
                  </div>

                  <hr />
                  <h2 className="py-3">
                    Paysofter Promise <i className="fas fa-money-bill-wave"></i>
                  </h2>
                  <hr />
                  <Row>
                    <Col>
                      <h5 className="py-3">Paid Promise Rate</h5>
                      <div className="chart-container">
                        <Pie
                          data={paidPayoutRateData}
                          options={pieChartOptions}
                          width={200}
                          height={200}
                        />
                      </div>
                    </Col>

                    <Col>
                      <h5 className="py-3">Promise Approval Rate</h5>
                      <div className="chart-container">
                        <Pie
                          data={unfulfilledPayoutRateData}
                          options={pieChartOptions}
                          width={200}
                          height={200}
                        />
                      </div>
                    </Col>
                  </Row>

                  <hr />
                  <h2 className="py-3">
                    Acccount Funds <i className="fas fa-money-bill-alt"></i>
                  </h2>
                  <hr />
                  <Row>
                    <Col>
                      <h5 className="py-3">Paid Acccount Funds Rate</h5>
                      <div className="chart-container">
                        <Pie
                          data={paidPayoutRateData}
                          options={pieChartOptions}
                          width={200}
                          height={200}
                        />
                      </div>
                    </Col>

                    <Col>
                      <h5 className="py-3">Acccount Funds Approval Rate</h5>
                      <div className="chart-container">
                        <Pie
                          data={unfulfilledPayoutRateData}
                          options={pieChartOptions}
                          width={200}
                          height={200}
                        />
                      </div>
                    </Col>
                  </Row>
                  <hr />

                  <div className="py-3">
                    <h2 className="">
                      Payouts <i className="fas fa-money-bill"></i>
                    </h2>
                    <hr />
                    <Row>
                      <Col>
                        <h5 className="py-3">Paid Payout Rate</h5>
                        <div className="chart-container">
                          <Pie
                            data={paidPayoutRateData}
                            options={pieChartOptions}
                            width={200}
                            height={200}
                          />
                        </div>
                      </Col>

                      <Col>
                        <h5 className="py-3">Payout Approval Rate</h5>
                        <div className="chart-container">
                          <Pie
                            data={unfulfilledPayoutRateData}
                            options={pieChartOptions}
                            width={200}
                            height={200}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <hr />
                </Row>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
