import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, initializeCurrentUserData } from "./firebase";

const Auth = createContext();

export const useAuth = () => useContext(Auth);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const logInAsGuest = async () => {
    try {
      await signInAnonymously(auth);
      await initializeCurrentUserData();
      return true;
    } catch (error) {
      return false;
    }
  };

  const logInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return false;
    }
  };

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await initializeCurrentUserData();
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Auth.Provider
      value={{
        currentUser,
        logInAsGuest,
        logInWithEmail,
        logOut,
        signUp,
      }}
    >
      {!loading && children}
    </Auth.Provider>
  );
}
