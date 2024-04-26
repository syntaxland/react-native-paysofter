// ToggleUsdAccountSettings.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleUsdAccountFund } from "../../redux/actions/AccountFundActions";
import Message from "../Message";
import Loader from "../Loader";

const ToggleUsdAccountSettings = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const toggleUsdAccountFundState = useSelector(
    (state) => state.toggleUsdAccountFundState
  );
  const { success, error, loading } = toggleUsdAccountFundState;

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { accountFundBalance } = userAccountBalanceState;
  console.log("accountFundBalance:", accountFundBalance);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // window.location.reload();
        // history.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const toggleData = {
    password: password,
  };

  const handleFundAccountToggle = () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }
    dispatch(toggleUsdAccountFund(toggleData));
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {success && (
        <Message variant="success">
          USD Account Fund status toggled successfully.
        </Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      <View style={styles.statusContainer}>
        <Text>
          Status:{" "}
          {accountFundBalance?.is_diabled ? (
            <Text style={styles.disabled}>Disabled</Text>
          ) : (
            <Button title="Toggle Status" onPress={handleFundAccountToggle} />
          )}
        </Text>
      </View>
      <Text style={styles.warning}>
        <Text style={styles.warningIcon}>⚠️</Text> Warning! This action will
        block or enable all transaction withdrawals from this account. Enter
        password for your account email <Text style={styles.email}>{userInfo.email}</Text>:
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        style={styles.input}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <Button
        title="Toggle USD Account Fund Status"
        onPress={handleFundAccountToggle}
        disabled={loading || success}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  statusContainer: {
    marginBottom: 10,
  },
  disabled: {
    color: "red",
  },
  warning: {
    marginBottom: 10,
  },
  warningIcon: {
    fontSize: 18,
  },
  email: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default ToggleUsdAccountSettings;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleUsdAccountFund } from "../../redux/actions/AccountFundActions";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import Message from "../Message";
// import Loader from "../Loader";

// function ToggleUsdAccountSettings() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const userLogin = useSelector((state) => state.userLogin); 
//   const { userInfo } = userLogin;

//   const toggleUsdAccountFundState = useSelector(
//     (state) => state.toggleUsdAccountFundState
//   );
//   const { success, error, loading } = toggleUsdAccountFundState;

//   const userAccountBalanceState = useSelector(
//     (state) => state.userAccountBalanceState
//   );
//   const { accountFundBalance } = userAccountBalanceState;
//   console.log("accountFundBalance:", accountFundBalance);

//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         window.location.reload();
//         // history.push("/");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, history]);

//   const toggleData = {
//     password: password,
//   };

//   const handleFundAccountToggle = () => {
//     if (!password.trim()) {
//       setPasswordError("Password is required");
//       return;
//     }
//     dispatch(toggleUsdAccountFund(toggleData));
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center py-2">
//         <Col>
//           {/* <h2 className="mb-4">Toggle Account Fund</h2> */}
//           {loading && <Loader />}
//           {success && (
//             <Message variant="success">
//               USD Account Fund status toggled successfully.
//             </Message>
//           )}
//           {error && <Message variant="danger">{error}</Message>}
//           <div className="text-center py-2">
//             <strong>Staus:</strong>{" "}
//             {accountFundBalance?.is_diabled ? (
//               <>
//                 <span className="py-2">
//                   <Button
//                     variant="outline-transparent"
//                     className="rounded"
//                     size="sm"
//                     title="Account Fund is currently disabled. Please contact support."
//                   >
//                     <i
//                       className="fas fa-lock"
//                       style={{ fontSize: "16px", color: "red" }}
//                     ></i>{" "}
//                     Disabled
//                   </Button>
//                 </span>
//               </>
//             ) : (
//               <>
//                 <Button
//                   variant="outline-transparent"
//                   className="rounded"
//                   size="sm"
//                   title="Set Account Fund active or locked."
//                 >
//                   {accountFundBalance?.is_active ? (
//                     <>
//                       <i
//                         className="fas fa-lock-open"
//                         style={{ fontSize: "16px", color: "green" }}
//                       ></i>{" "}
//                       Active
//                     </>
//                   ) : (
//                     <>
//                       <i
//                         className="fas fa-lock text-warning"
//                         style={{
//                           fontSize: "16px",
//                           // color: "yellow",
//                         }}
//                       ></i>{" "}
//                       Locked
//                     </>
//                   )}
//                 </Button>
//               </>
//             )}
//           </div>
//           <p className="rounded mt-2 py-1 text-center">
//             <i
//               className="fa fa-warning text-warning"
//               style={{ fontSize: "18px", 
//               // color: "yellow" 
//             }}
//             ></i>{" "}
//             Warning! This action will block or enable all transaction
//             withdrawals from this account. Enter password for your account email{" "}
//             <strong>{userInfo.email}</strong>:{" "}
//           </p>

//           <Form>
//             <Form.Group>
//               <Form.Control
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="rounded mt-2"
//                 required
//                 maxLength={100}
//               />
//               <Form.Text className="text-danger">{passwordError}</Form.Text> 
//             </Form.Group>
//             <Button
//               variant="primary"
//               onClick={handleFundAccountToggle}
//               className="rounded mt-2 text-center w-100"
//               disabled={loading || success}
//               >
//               Toggle USD Account Fund Status
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ToggleUsdAccountSettings;
