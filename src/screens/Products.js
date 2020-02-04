import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

import { searchProducts } from "../lib/api";
import { useDebouncedEffect } from "../lib/core";

const Title = styled.h1`
  margin: 0;
  padding: 60px 0;
  text-align: center;
  font-family: "Jim Nightshade", cursive;
`;

const SearchBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #3f220fa0;

  @media (min-width: 1112px) {
    flex-direction: row;
    align-items: center;
    padding: 10px;
  }
`;

const StyledInput = styled.input`
  outline: none;
  width: 90%;
  margin: 0 auto;
  border: none;
  border-bottom: 1px solid white;
  background-color: transparent;
  color: white;
  font-size: 20px;
  padding: 0.5em;

  &::placeholder {
    color: #ffffffb0;
  }

  @media (min-width: 1112px) {
    margin: 0;
  }
`;

const KeywordInput = styled(StyledInput)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const PriceSelectorRow = styled.div`
  align-items: center;
  color: white;
  width: 90%;
  margin: 0 auto 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 1112px) {
    margin: 0;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const PriceSelector = styled(StyledInput)`
  margin: 0;
  width: 40%;
`;

const CategorySelector = styled.select`
  outline: none;
  width: 90%;
  margin: 0 auto 20px auto;
  background-color: transparent;
  color: white;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid white;
  border-radius: 0;

  &:not([multiple]) {
    -webkit-appearance: none;
    -moz-appearance: none;
    background-position: right 50%;
    background-repeat: no-repeat;
    background-image: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="14" height="12" version="1"><path d="M4 8L0 4h8z"/></svg>');
    padding: 0.5em;
    padding-right: 1.5em;
  }

  @media (min-width: 1112px) {
    margin: 0;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  justify-items: center;
  margin: 0 auto;
`;

export default function Products(props) {
  const [products, setProducts] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [category, setCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function doSomething() {
      setIsLoading(true);
      setProducts(await searchProducts());
      setIsLoading(false);
      console.log(products);
    }
    doSomething();
  }, []);

  useDebouncedEffect(
    () => {
      async function doSomething() {
        setIsLoading(true);
        setProducts(
          await searchProducts(keyword, category, minPrice, maxPrice)
        );
        setIsLoading(false);
      }
      doSomething();
    },
    500,
    [keyword, category, minPrice, maxPrice]
  );

  return (
    <>
      <Title>Nuestros productos</Title>
      <SearchBar>
        <KeywordInput
          placeholder="Nombre..."
          onChange={e => setKeyword(e.target.value)}
        ></KeywordInput>
        <CategorySelector onChange={e => setCategory(e.target.value)}>
          <option value="">Todas</option>
          <option value="carteras">Carteras</option>
          <option value="maletines">Maletines</option>
          <option value="zapatos">Zapatos</option>
        </CategorySelector>
        <PriceSelectorRow>
          <PriceSelector
            type="number"
            placeholder="$ mínimo"
            onChange={e => setMinPrice(e.target.value)}
          ></PriceSelector>
          A
          <PriceSelector
            type="number"
            placeholder="$ máximo"
            onChange={e => setMaxPrice(e.target.value)}
          ></PriceSelector>
        </PriceSelectorRow>
      </SearchBar>
      {isLoading || !products ? (
        <Spinner />
      ) : (
        <CardsContainer>
          {products.map(product => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </CardsContainer>
      )}
    </>
  );
}
