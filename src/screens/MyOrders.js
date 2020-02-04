import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { getOrders } from "../lib/api";
import { formatNumber } from "../lib/core";

const Title = styled.h1`
  padding-top: 60px;
  padding-bottom: 60px;
  font-family: Jim Nightshade, cursive;
  text-align: center;
`;

const OrdersContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Montserrat", sans-serif;
  border: 1px solid lightgray;
  padding: 20px;
  margin-bottom: 20px;

  -webkit-box-shadow: 6px 6px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 6px 14px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 6px 14px 0px rgba(0, 0, 0, 0.75);
`;

export default function MyOrders(props) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const newOrders = await getOrders();
      setOrders(newOrders);
      await console.log(newOrders);
    };
    fetchOrders();
  }, []);
  return (
    <>
      <Title>Mis ordenes</Title>
      <OrdersContainer>
        {orders.map(order => (
          <OrderRow>
            <span>{`Ordenado en: ${new Date(order.timestamp)}`}</span>
            <span>{formatNumber(order.total / 100)}</span>
          </OrderRow>
        ))}
      </OrdersContainer>
    </>
  );
}
