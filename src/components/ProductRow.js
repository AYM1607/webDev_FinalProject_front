import React from "react";
import styled, { css } from "styled-components";

import { mapColorStringToHexString, formatNumber } from "../lib/core";
import cart from "../lib/shoppingCart";

const hideMixin = css`
  display: none;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PriceRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const Column = styled.div`
  margin: 10px 0;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  -webkit-box-shadow: 0px 10px 11px -1px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 0px 10px 11px -1px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 10px 11px -1px rgba(0, 0, 0, 0.35);
`;

const Color = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${props => props.backgroundColor || "black"};
`;

const Thumbnail = styled.img`
  margin-left: 5px;
  height: 50px;
  width: 50px;
  object-fit: contain;
  object-position: center;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Name = styled.p`
  margin: 0;
  margin-left: 5px;
  display: inline-block;
  font-size: 16px;
`;

const AmountButton = styled.div`
  user-select: none;
  text-align: center;
  color: white;
  margin: 0 5px;
  width: 30px;
  background-color: lightgray;
  ${props => (props.hide ? hideMixin : "")}

  &:hover {
    cursor: pointer;
  }
`;

const Amount = styled.div`
  margin: 0 5px;
`;

export default function CartRow(props) {
  const { itemIndex, isSummary } = props;
  const { color, imageUrl, name, amount, price } = props.item;
  return (
    <Column>
      <Row>
        <Color backgroundColor={mapColorStringToHexString(color)} />
        <Thumbnail src={imageUrl} />
        <Name>{name}</Name>
      </Row>
      <Spacer />
      <PriceRow>
        <div>Cantidad: </div>
        <AmountButton
          hide={isSummary}
          onClick={() => cart.updateItemAmount(itemIndex, amount - 1)}
        >
          -
        </AmountButton>
        <Amount>{amount}</Amount>
        <AmountButton
          hide={isSummary}
          onClick={() => cart.updateItemAmount(itemIndex, amount + 1)}
        >
          +
        </AmountButton>
        <Spacer />
        <div>{formatNumber((price * amount) / 100)}</div>
      </PriceRow>
    </Column>
  );
}
