import React, { useState } from "react";
import styled from "styled-components";

import { formatNumber, mapColorStringToHexString } from "../lib/core";
import cart from "../lib/shoppingCart";

const Card = styled.div`
  width: 360px;
  height: 450px;
  margin-top: 40px;

  -webkit-box-shadow: 5px 5px 19px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 5px 5px 19px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 5px 5px 19px -2px rgba(0, 0, 0, 0.75);
`;

const CardImage = styled.img`
  height: 180px;
  width: 360px;
  object-fit: contain;
  object-position: center;
`;

const CardContent = styled.div`
  height: 270px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
`;

const ProductName = styled.h3`
  margin: 0;
  font-family: "Montserrat Alternates", sans-serif;
`;

const ProductDescription = styled.p`
  text-align: justify;
  margin: 0;
  margin-top: 10px;
`;

const ProductCategory = styled.p`
  font-style: italic;
  margin-top: 10px;
`;

const BottomRow = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColorsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Color = styled.div`
  width: 30%;
  height: 30px;
  background-color: ${props => props.backgroundColor};
  border-radius: 5px;
  box-shadow: ${props =>
    props.active ? "2px 2px 10px -2px rgba(0, 0, 0, 0.75)" : "none"};
  border: ${props => (props.active ? "1px solid white" : "none")};
`;

const Spacer = styled.div`
  flex: 1;
`;

const AddToCartButton = styled.div`
  background-color: #6f372d;
  color: white;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export default function ProductCard(props) {
  const availableColors = ["black", "mocka", "tan"];
  const [selectedColor, setSelectedColor] = useState("black");
  const { name, category, description, price, imageUrl } = props.product;

  return (
    <Card>
      <CardImage src={imageUrl} />
      <CardContent>
        <ProductName>{name}</ProductName>
        <ProductDescription>{description}</ProductDescription>
        <ProductCategory>Categoría: {category}</ProductCategory>
        <Spacer />
        <ColorsRow>
          {availableColors.map(color => (
            <Color
              key={color}
              active={selectedColor === color}
              backgroundColor={mapColorStringToHexString(color)}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </ColorsRow>
        <BottomRow>
          <div>{formatNumber(price / 100)}</div>
          <AddToCartButton
            onClick={() =>
              cart.addItem({
                ...props.product,
                color: selectedColor,
                amount: 1
              })
            }
          >
            Agregar al carrito
          </AddToCartButton>
        </BottomRow>
      </CardContent>
    </Card>
  );
}
