// // PromiseMessage.js
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import {
//   createPromiseMessages,
//   listPromiseMessages, 
// } from "../../redux/actions/PromiseActions";
// import Loader from "../Loader"; 
// import Message from "../Message"; 

// function PromiseMessage() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const { id } = useParams();
//   const [message, setMessage] = useState("");

//   const createPromiseMessageState = useSelector(
//     (state) => state.createPromiseMessageState
//   );
//   const { loading, success, error } = createPromiseMessageState;

//   const listPromiseMessageState = useSelector(
//     (state) => state.listPromiseMessageState
//   );
//   const { promiseMessages } = listPromiseMessageState;  
//   console.log("promiseMessages:", promiseMessages);

//   useEffect(() => {
//     const promiseId = id;
//     dispatch(listPromiseMessages(promiseId));
//   }, [dispatch, id]);  

//   const handleSubmitReply = (e) => {
//     e.preventDefault();

//     const promiseMessageData = {
//       promise_id: id,
//       message: message,
//     };

//     dispatch(createPromiseMessages(promiseMessageData));
//   };

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         // history.push("/dashboard");
//         window.location.reload();
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [success, history]);

//   return (
//     <div>
//       <div>
//         <Row className="justify-content-center">
//           <Col xs={12} md={6}>
//             {/* <h1 className="text-center py-3"> Promise Messages</h1> */}
//             {loading && <Loader />}
//             {error && <Message variant="danger">{error}</Message>}
//             {/* {success && (
//               <Message variant="success">Message sent successfully.</Message>
//             )} */}

//             <h2 className="border rounded p-4 py-4">Promise ID: {id}</h2>

//             <ul>
//               {promiseMessages?.map((message) => (
//                 <div className="py-2">
//                   <li key={message.id} className="border rounded p-4 py-2">
//                     <p>
//                       User:{" "}
//                       {message.first_name?.charAt(0).toUpperCase() +
//                         message.first_name?.slice(1)}
//                     </p>
//                     <p>Message: {message.message}</p>
//                     <p>
//                       Timestamp: {new Date(message.timestamp).toLocaleString()}
//                     </p>
//                     {/* <p>Rating: {message.rating}</p> */}
//                   </li>
//                 </div>
//               ))}
//             </ul>

//             <Form onSubmit={handleSubmitReply}>
//               <Form.Group controlId="message">
//                 <Form.Label>Message</Form.Label>
//                 <Form.Control
//                   required
//                   as="textarea"
//                   placeholder="Type your message"
//                   rows={4}
//                   value={message}
//                   maxLength={1000}
//                   onChange={(e) => setMessage(e.target.value)}
//                 ></Form.Control>
//               </Form.Group>

//               <div className="py-2">
//                 <Button
//                   className="w-100 rounded"
//                   type="submit"
//                   variant="primary"
//                 >
//                   Submit
//                 </Button>
//               </div>
//               {success && (
//                 <Message variant="success">Message sent successfully.</Message>
//               )}
//             </Form>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }

// export default PromiseMessage;
