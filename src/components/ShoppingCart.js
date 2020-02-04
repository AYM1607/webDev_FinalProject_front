import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";

import cart from "../lib/shoppingCart";

import CartRow from "./ProductRow";
import ClosingButton from "./ClosingButton";
import { formatNumber } from "../lib/core";

const SideModal = styled.div`
  width: ${props => (props.isOpen ? "100%" : "0")};
  float: right;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  background-color: #ffff;
  overflow-x: hidden;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  margin-right: 0;
  overflow-y: auto;

  -webkit-box-shadow: -1px 0px 12px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 0px 12px -1px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 0px 12px -1px rgba(0, 0, 0, 0.75);

  @media (min-width: 500px) {
    width: ${props => (props.isOpen ? "500px" : "0")};
  }
`;

const InnerContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  padding: 20px;
`;

const EmptyCart = styled.h2`
  text-align: center;
  margin-top: 40px;
`;

const Total = styled.h2`
  margin-top: 20px;
  margin-left: auto;
`;

const PayButton = styled.div`
  width: 100px;
  height: 30px;
  color: white;
  background-color: #6f372d;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  margin: 0 auto;
`;

export default function ShoppingCart(props) {
  const [cartState, setCartState] = useState(cart.initialState);

  useLayoutEffect(() => {
    cart.subscribe(setCartState);
  }, []);

  const getTotal = () =>
    cartState.cartItems.reduce(
      (acum, item) => acum + item.amount * item.price,
      0
    );

  return (
    <SideModal isOpen={cartState.isOpen}>
      <InnerContainer>
        <ClosingButton alignLeft onClick={() => cart.closeCart()} />
        {cartState.cartItems.length > 0 ? (
          <>
            <h3>Mi carrito:</h3>
            {cartState.cartItems.map((item, index) => (
              <CartRow
                item={item}
                itemIndex={index}
                key={`${item.id}${item.color}`}
              ></CartRow>
            ))}
            <Total>Total a pagar: {formatNumber(getTotal() / 100)}</Total>
            <PayButton
              onClick={() => {
                props.history.push("/pagar");
                cart.closeCart();
              }}
            >
              Pagar
            </PayButton>
          </>
        ) : (
          <EmptyCart>Uppsss! Aún no tienes nada en tu carrito</EmptyCart>
        )}
      </InnerContainer>
    </SideModal>
  );
}
