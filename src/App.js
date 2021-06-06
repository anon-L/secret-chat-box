import logo from "./logo.svg";
import "./App.css";
import { auth, firebase, db, googleAuthProvider } from "./firebase";
import { useState, useEffect } from "react";
import Channel from "./component/channel";
import Button from "react-bootstrap/Button";

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = googleAuthProvider;
    // Set language to the default browser preference
    auth.useDeviceLanguage();
    // Start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container py-3">
      {user ? (
        <>
          <div className="row">
            <div className="col p-2">
              <Button className="float-right" onClick={signOut}>
                Sign out
              </Button>
            </div>
          </div>

          <Channel user={user} />
        </>
      ) : (
        <div className="row">
            <div className="col text-center">
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>
        
      )}
    </div>
  );
}

export default App;
