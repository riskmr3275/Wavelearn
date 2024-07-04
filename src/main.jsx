import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducers from "../src/reducer/index.jsx"
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";
const store=configureStore({
  reducer:rootReducers
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


// Notes:-
// 1. Provider:
  // In React Redux, the Provider component is used to make the Redux store available to all container components 
  // in your application hierarchy without having to pass the store explicitly as a prop. This is essential for connecting your React components to the Redux store.
  // Here's a brief explanation:
  // Importing Provider: First, you need to import Provider from react-redux.
  // Wrapping Your App: You wrap your root component (often <App />) with the Provider component and
  //  pass the Redux store as a prop to Provider. This way, the entire component tree gets access to the Redux store.
  // Connecting Components: Any component within the Provider can access the Redux store using the connect function or the useSelector and useDispatch hooks.

// 2.BrowserRouter
  // In React, BrowserRouter is a component from the react-router-dom library that uses the HTML5
  //  history API (pushState, replaceState, and the popstate event) to keep your UI in sync with the URL.
  //   It is one of the routers provided by react-router-dom and is commonly used for web applications that need to handle navigation and routing. 