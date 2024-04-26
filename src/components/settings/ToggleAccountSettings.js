// ToggleAccountSettings.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleAccountFund } from "../../redux/actions/AccountFundActions";
import Message from "../Message";
import Loader from "../Loader";

const ToggleAccountSettings = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const toggleAccountFundState = useSelector(
    (state) => state.toggleAccountFundState
  );
  const { success, error, loading } = toggleAccountFundState;

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { accountFundBalance } = userAccountBalanceState;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        // Do something after toggling account fund status successfully
      }, 3000);
    }
  }, [success]);

  const handleFundAccountToggle = () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }
    const toggleData = {
      password: password,
    };
    dispatch(toggleAccountFund(toggleData));
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {success && (
        <Message variant="success">
          Account Fund status toggled successfully.
        </Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      <View style={styles.statusContainer}>
        <Text>
          Status:{" "}
          {accountFundBalance?.is_diabled ? (
            <Text style={styles.disabledText}>Disabled</Text>
          ) : (
            <Text style={styles.enabledText}>Active</Text>
          )}
        </Text>
      </View>
      <Text style={styles.warningText}>
        Warning! This action will block or enable all transaction withdrawals
        from this account. Enter password for your account email{" "}
        <Text style={styles.emailText}>{userInfo.email}</Text>:
      </Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        style={styles.input}
        secureTextEntry={true}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Button
        title="Toggle Account Fund Status"
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
  disabledText: {
    color: "red",
  },
  enabledText: {
    color: "green",
  },
  warningText: {
    marginBottom: 10,
  },
  emailText: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default ToggleAccountSettings;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAccountFund } from "../../redux/actions/AccountFundActions";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import Message from "../Message";
// import Loader from "../Loader";

// function ToggleAccountSettings() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const userLogin = useSelector((state) => state.userLogin); 
//   const { userInfo } = userLogin;

//   const toggleAccountFundState = useSelector(
//     (state) => state.toggleAccountFundState
//   );
//   const { success, error, loading } = toggleAccountFundState;

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
//     dispatch(toggleAccountFund(toggleData));
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center py-2">
//         <Col>
//           {/* <h2 className="mb-4">Toggle Account Fund</h2> */}
//           {loading && <Loader />}
//           {success && (
//             <Message variant="success">
//               Account Fund status toggled successfully.
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
//              }}
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
//               Toggle Account Fund Status
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ToggleAccountSettings;
