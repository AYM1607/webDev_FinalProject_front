import React from "react";
import styled from "styled-components";

import vacaImage from "../assets/vaca.jpg";

const StyledImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Title = styled.h1`
  padding-bottom: 60px;
  font-family: Jim Nightshade, cursive;
  text-align: center;
`;

const Paragraph = styled.p`
  width: 80%;
  font-family: "Montserrat", sans-serif;
  margin: 20px auto;
  font-size: 20px;
`;

export default function AboutUs(props) {
  return (
    <>
      <StyledImage src={vacaImage} />
      <Title>Nosotros:</Title>
      <Paragraph>
        Lethery es una empresa dedicada a la venta de diferentes artículos de
        piel, cuyo objetivo es crear un canal de distribución eficiente y
        económicamente rentable. Nuestra misión es destinar un porcentaje de las
        ganancias a asociaciones que busquen dar una vida mas diga a los
        animales de campo.
      </Paragraph>
      <Paragraph>
        La Confederación Nacional de Asociaciones de Ganado Vacuno Pirenaico
        (acrónimo CONASPI) es una agrupación de entidades creada en 1986 por la
        unión de diversas asociaciones regionales para la defensa de la raza
        bovina Pirenaica.
      </Paragraph>
      <Paragraph>
        El 7 de diciembre de 1988 fue reconocida oficialmente por el Ministerio
        de Agricultura, Alimentación y Medio Ambiente como Entidad Colaboradora
        para la gestión y control del libro genealógico y de comprobación de
        rendimientos de la raza bovina Pirenaica.
      </Paragraph>
    </>
  );
}
