import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getCurrentDate } from "../utils/utils";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export const updateDataField = async (dataFieldName, newValue) => {
  const { currentUser } = auth;

  if (currentUser) {
    await updateDoc(doc(db, "users", currentUser.uid), {
      [dataFieldName]: newValue,
    });
  }
};

export const initializeCurrentUserData = async () => {
  const { currentUser } = auth;

  if (currentUser) {
    await setDoc(doc(db, "users", currentUser.uid), {
      mileageUnit: "km",
      minMileage: 0,
      maxMileage: 10000,
      currentMileage: 100,
      minDate: "2023-01-01",
      maxDate: "2023-12-31",
      currentDate: getCurrentDate(),
      vehicleName: "My Vehicle",
    });
  }
};
