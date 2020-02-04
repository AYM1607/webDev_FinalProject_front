import React, { useLayoutEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import "./App.css";

import auth from "./lib/auth";

import NavigationBar from "./components/NavigationBar";
import ShoppingCart from "./components/ShoppingCart";
import Routes from "./Routes";

const RoutesContainer = styled.div`
  margin-top: 60px;
`;

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

function App(props) {
  const [authState, setAuthState] = useState(auth.initialState);

  useLayoutEffect(() => {
    auth.subscribe(setAuthState);
  }, []);

  return (
    <div>
      <GlobalStyles />
      <NavigationBar
        {...props}
        isAuthenticated={authState.isAuthenticated}
        isAdmin={authState.isAdmin}
      />
      <RoutesContainer>
        <Routes
          {...props}
          isAuthenticated={authState.isAuthenticated}
          isAdmin={authState.isAdmin}
        />
      </RoutesContainer>
      <ShoppingCart {...props} />
    </div>
  );
}

export default withRouter(App);
