import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../components/Button";
import Spinner from "../components/Spinner";
import AdminProductCard from "../components/AdminProductCard";

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
  const [products, setProducts] = useState([
    {
      id: "lkjasdf",
      name: "Cartera para dama",
      description:
        "Esta cartera es muy elegante, incorpora un cierre y varios compartimentos",
      category: "carteras",
      price: 250000,
      imageUrl:
        "https://final-project-web-dev.s3.amazonaws.com/images/01E07HSCWZWPN5YJVFX2FKFKR3.png"
    },
    {
      id: "lkjasdfasdf",
      name: "Cartera para dama",
      description:
        "Esta cartera es muy elegante, incorpora un cierre y varios compartimentos",
      category: "carteras",
      price: 250000,
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71PUr7p3-XL._AC_UY1000_.jpg"
    },
    {
      id: "lkjasdsaaaasdf",
      name: "Cartera para dama",
      description:
        "Esta cartera es muy elegante, incorpora un cierre y varios compartimentos",
      category: "carteras",
      price: 250000,
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71PUr7p3-XL._AC_UY1000_.jpg"
    },
    {
      id: "lkj345asdf",
      name: "Cartera para dama",
      description:
        "Esta cartera es muy elegante, incorpora un cierre y varios compartimentos",
      category: "carteras",
      price: 250000,
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71PUr7p3-XL._AC_UY1000_.jpg"
    }
  ]);

  useEffect(() => {
    //TODO: fetch the products here.
  }, []);

  return (
    <>
      <Title>Bienvenido administrador</Title>
      <StyledButton onClick={() => props.history.push("/new-product")}>
        Agregar nuevo producto
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
