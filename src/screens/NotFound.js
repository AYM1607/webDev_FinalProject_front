import React from "react";
import styled from "styled-components";

const TitlesContainer = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Jim Nightshade", cursive;
`;

export default function(props) {
  return (
    <TitlesContainer>
      <Title>No pudimos encontrar esta pagina.</Title>
    </TitlesContainer>
  );
}
