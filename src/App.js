import React from "react";
import { withRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import "./App.css";

import NavigationBar from "./components/NavigationBar";
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
  return (
    <div>
      <GlobalStyles />
      <NavigationBar {...props} />
      <RoutesContainer>
        <Routes {...props} />
      </RoutesContainer>
    </div>
  );
}

export default withRouter(App);
