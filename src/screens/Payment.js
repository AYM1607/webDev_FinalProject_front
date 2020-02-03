import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as yup from "yup";

import cart from "../lib/shoppingCart";
import { formatNumber } from "../lib/core";

import ProductRow from "../components/ProductRow";
import FloatingLabelField from "../components/FloatingLabelField";
import LoaderButton from "../components/LoaderButton";

const { cartItems } = cart.getCurrentState();

const PaymentScreenContainer = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  font-family: "Montserrat", sans-serif;
`;

const InnerContainer = styled.div`
  @media (min-width: 1112px) {
    & {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
`;

const Summary = styled.div`
  width: 100%;

  @media (min-width: 1112px) {
    & {
      width: 45%;
    }
  }
`;

const PaymentForm = styled.div`
  width: 100%;
  height: 300px;

  @media (min-width: 1112px) {
    & {
      width: 45%;
    }
  }
`;

const Title = styled.h1`
  padding-top: 20px;
`;

const StyledField = styled(FloatingLabelField)`
  margin-top: 40px;

  @media (min-width: 1112px) {
    & {
      margin-top: ${props => (props.first ? "0" : "40px")};
    }
  }
`;

const FieldsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(LoaderButton)`
  margin-top: 20px;
  margin-left: auto;
`;

const formSchema = yup.object().shape({
  "name-on-card": yup.string().required("Proporciona este campo"),
  "card-number": yup
    .string()
    .required("Proporciona este campo")
    .matches(/^\d{16}$/, "Longitud incorrecta"),
  "card-month": yup
    .string()
    .required("Proporciona este campo")
    .matches(/^\d{2}$/, "Longitud incorrecta"),
  "card-year": yup
    .string()
    .required("Proporciona este campo")
    .matches(/^\d{2}$/, "Longitud incorrecta"),
  "card-cvv": yup
    .string()
    .required("Proporciona este campo")
    .matches(/^\d{3}$/, "Longitud incorrecta")
});

export default function Payment(props) {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // TODO: Implement the create order logic here.
    cart.clearCart();
    props.history.push("/gracias");
  };

  const getTotal = () =>
    cartItems.reduce((acum, item) => acum + item.amount * item.price, 0);
  return (
    <PaymentScreenContainer>
      <Title>Tu pedido:</Title>
      <InnerContainer>
        <Summary>
          {cartItems.map((item, index) => (
            <ProductRow
              isSummary
              itemIndex={index}
              item={item}
              key={`${item.id}${item.color}`}
            ></ProductRow>
          ))}
          <h2>{`Total: ${formatNumber(getTotal() / 100)}`}</h2>
        </Summary>
        <PaymentForm>
          <Formik
            initialValues={{
              "name-on-card": "",
              "card-number": "",
              "card-month": "",
              "card-year": "",
              "card-cvv": ""
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, isSubmitting }) => (
              <Form>
                <StyledField
                  first
                  name="name-on-card"
                  labelText="Nombre en la tarjeta"
                  type="text"
                />
                <StyledField
                  name="card-number"
                  labelText="Número de tarjeta"
                  type="number"
                />
                <FieldsRow>
                  <StyledField
                    inRow
                    name="card-month"
                    labelText="Mes"
                    type="number"
                  />
                  <StyledField
                    inRow
                    name="card-year"
                    labelText="Año"
                    type="number"
                  />
                  <StyledField
                    inRow
                    name="card-cvv"
                    labelText="CVV"
                    type="number"
                  />
                </FieldsRow>
                <StyledButton
                  type="submit"
                  text="Pagar"
                  loadingText="Procesando"
                />
              </Form>
            )}
          </Formik>
        </PaymentForm>
      </InnerContainer>
    </PaymentScreenContainer>
  );
}
