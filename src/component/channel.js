import { auth, firebase, db, googleAuthProvider } from "../firebase";
import { useState, useEffect } from "react";
import Message from "./message";
import { Button, FormControl } from "react-bootstrap";

const Channel = ({ user = null }) => {
  const query = db.collection("messages").orderBy("at").limit(100);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { uid, displayName, photoURL } = user;

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      db.collection("messages").add({
        text: trimmedMessage,
        at: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
      // Clear input field
      setNewMessage("");
    }
  };
  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(data);
    });

    // Detach listener
    return unsubscribe;
  }, []);

  return (
    <>
      <>
        {messages.map((message) => (
          // <li key={message.id}>
            <Message key={message.id} {...message} isSender={message.uid == user.uid} />
        /* </li> */
        ))}
      </>
      <form onSubmit={handleOnSubmit}>
        <div className="row">
          <div className="col-8">
            <FormControl
              type="text"
              value={newMessage}
              onChange={handleOnChange}
              placeholder="Type your message here..."
            />
          </div>
          <div className="col-4 ">
            <Button className="float-right ml-20" type="submit" disabled={!newMessage}>
              Send
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Channel;
