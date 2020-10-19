import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import store from "./Store/redux-store";
import App from "./App";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <div className="wrapper">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
