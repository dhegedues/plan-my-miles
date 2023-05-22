import { createContext, useContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./Auth";

const Firestore = createContext();

export const useFirestore = () => useContext(Firestore);

export function FirestoreProvider({ children }) {
  const { currentUser } = useAuth();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, "users", currentUser.uid),
        (snapshot) => {
          setUserData(snapshot.data());
          setDataLoaded(true);
        },
        (error) => {
          setDataLoaded(false);
        }
      );

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <Firestore.Provider value={{ ...userData, dataLoaded }}>
      {children}
    </Firestore.Provider>
  );
}
