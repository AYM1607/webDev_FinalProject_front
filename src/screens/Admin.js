import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../components/Button";
import Spinner from "../components/Spinner";
import AdminProductCard from "../components/AdminProductCard";

import { searchProducts } from "../lib/api";

const Title = styled.h1`
  text-align: center;
  padding-top: 60px;
  font-family: "Montserrat Alternates", sans-serif;
`;

const LeftTitle = styled.h1`
  text-align: start;
  font-family: "Montserrat Alternates", sans-serif;
`;

const StyledButton = styled(Button)`
  margin: 40px auto;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  justify-items: center;
  margin: 0 auto;
`;

export default function Admin(props) {
  const [isLoading, setIsLoading] = useState(false);
  // TODO: set the initial value as an empty array.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setProducts(await searchProducts());
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Title>Bienvenido administrador</Title>
      <StyledButton onClick={() => props.history.push("/new-product")}>
        Agregar producto
      </StyledButton>
      <LeftTitle>Productos actuales:</LeftTitle>
      {isLoading ? (
        <div>
          <Spinner></Spinner>
        </div>
      ) : (
        <CardsContainer>
          {products.map(product => (
            <AdminProductCard
              key={product.productId}
              product={product}
              history={props.history}
            />
          ))}
        </CardsContainer>
      )}
    </>
  );
}
