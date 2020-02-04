import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from { transform: scale(1) rotate(0deg); }
    to { transform: scale(1) rotate(360deg); }
`;

const RotatingGlyp = styled(FontAwesomeIcon)`
  margin: 20px auto;
  animation: ${rotate} 1s infinite linear;
`;

const Container = styled.div`
  text-align: center;
  width: 100px;
  position: relative;
  margin: 20px auto;
`;

export default props => (
  <Container>
    <RotatingGlyp size="4x" icon={faSpinner} />
  </Container>
);
