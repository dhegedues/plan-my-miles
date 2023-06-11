import ReactDOM from "react-dom/client";
import { AuthProvider } from "./firebase/Auth";
import { FirestoreProvider } from "./firebase/Firestore";
import App from "./App";
import "./index.css";
import { InputValidityProvider } from "./contexts/InputValidity";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FirestoreProvider>
      <InputValidityProvider>
        <App />
      </InputValidityProvider>
    </FirestoreProvider>
  </AuthProvider>
);
