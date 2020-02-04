import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

import { getTopProducts } from "../lib/api";

import bannerImage from "../assets/background.jpg";

const BannerImage = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: cover;
  object-position: top;
  position: absolute;
`;

const HeaderTitleContainer = styled.div`
  width: 100%;
  height: 50vh;
  position: absolute;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-family: Jim Nightshade, cursive;
  text-shadow: 2px 2px #000000a0;
  font-size: 50px;
  line-height: 50vh;
  margin: 0;
  color: white;
`;

const StyledHeader = styled.header`
  height: 50vh;
`;

const Title = styled.h2`
  margin: 0;
  margin-top: 20px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  justify-items: center;
  margin: 0 auto;
`;

export default function Home(_props) {
  const [products, setProducts] = useState(null);

  useState(() => {
    const fetchProducts = async () => {
      setProducts(await getTopProducts());
    };
    fetchProducts();
  }, []);

  return (
    <>
      <StyledHeader>
        <BannerImage src={bannerImage} />
        <HeaderTitleContainer>
          <HeaderTitle>Bienvenido a Leathery</HeaderTitle>
        </HeaderTitleContainer>
      </StyledHeader>
      <Title>Lo más nuevo:</Title>
      {products ? (
        <CardsContainer>
          {products.map(product => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </CardsContainer>
      ) : (
        <Spinner />
      )}
    </>
  );
}
