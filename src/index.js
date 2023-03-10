import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createClient,
  Provider,
  defaultExchanges,
  subscriptionExchange,
} from "urql";
import { CLIENT_URL, auth, APP_ID } from "./utils/auth";
import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionClient } from "onegraph-subscription-client";

const subscriptionClient = new SubscriptionClient(APP_ID, {
  oneGraphAuth: auth,
})

const client = createClient({
  url: CLIENT_URL,
  fetchOptions: () => {
    return {
      headers: {...auth.authHeaders()},
    }
  },
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider auth={auth}>
      <Provider value={client}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
