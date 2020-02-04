import React from "react";
import styled from "styled-components";

import Button from "../components/Button";

const Title = styled.h1`
  text-align: center;
  padding-top: 100px;
  font-family: "Jim Nightshade", cursive;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Spacer = styled.div`
  flex: 1;
`;

const WidthSpacer = styled.div`
  width: ${props => props.width || "0"}px;
`;

export default function ThankYou(props) {
  return (
    <>
      <Title>Muchas gracias por tu compra!</Title>
      <Row>
        <Spacer />
        <Button onClick={() => props.history.push("/")}>
          Página principal
        </Button>
        <WidthSpacer width="10" />
        <Button onClick={() => props.history.push("/ordenes")}>
          Mis ordenes
        </Button>
        <Spacer />
      </Row>
    </>
  );
}
