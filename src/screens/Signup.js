import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import FloatingLabelField from "../components/FloatingLabelField";
import LoaderButton from "../components/LoaderButton";

import auth from "../lib/auth";
import { querystring } from "../lib/core";
import { register } from "../lib/api";

const Title = styled.h1`
  text-align: center;
  font-family: "Jim Nightshade", cursive;
  padding-top: 60px;
`;

const FormContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  margin-top: 40px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 992px) {
    & {
      width: 60%;
    }
  }
`;

const StyledField = styled(FloatingLabelField)`
  margin-top: 40px;
`;

const StyledButton = styled(LoaderButton)`
  margin: 40px auto;

  @media (min-width: 992px) {
    & {
      margin-right: 0;
    }
  }
`;

const formSchema = Yup.object().shape({
  firstName: Yup.string().required("Por favor proporciona tu nombre"),
  lastName: Yup.string().required("Por favor proporciona tu apellido"),
  email: Yup.string()
    .required("Por favor proporciona tu correo electrónico")
    .email("Ingresa una dirección válida"),
  password: Yup.string()
    .required("Por favor proporciona tu contraseña")
    .min(8, "Tu contraseña debe tener al menos 8 caracteres"),
  "confirm-password": Yup.string()
    .required("Por favor confirma tu contraseña")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  shippingAddress: Yup.string().required("Por favor proporciona tu dirección"),
  shippingCity: Yup.string().required("Por favor proporciona tu ciudad"),
  shippingState: Yup.string().required("Por favor proporciona tu estado"),
  shippingZipCode: Yup.string()
    .required("Por favor proporciona tu código postal")
    .matches(/^\d{5}$/, "Introduce 5 dígitos numéricos")
});

export default function Signup(props) {
  const handleSubmit = async (values, { setSubmitting }) => {
    // TODO: reset form if the user is already registered.
    const payload = { ...values, "confirm-password": undefined };
    try {
      await register(payload);
      props.history.push("/login");
    } catch (e) {
      console.log(e);
      alert("Lo sentimos, no pudimos registrarte.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Title>Registrate</Title>
      <FormContainer>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            "confirm-password": "",
            shippingAddress: "",
            shippingCity: "",
            shippingState: "",
            zip: ""
          }}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <FloatingLabelField
                name="firstName"
                type="text"
                labelText="Nombre"
              />
              <StyledField name="lastName" type="text" labelText="Apellido" />
              <StyledField
                name="email"
                type="email"
                labelText="Correo electrónico"
              />
              <StyledField
                name="password"
                type="password"
                labelText="Contraseña"
              />
              <StyledField
                name="confirm-password"
                type="password"
                labelText="Confirmar contraseña"
              />
              <StyledField
                name="shippingAddress"
                type="text"
                labelText="Dirección"
              />
              <StyledField name="shippingCity" type="text" labelText="Ciudad" />
              <StyledField
                name="shippingState"
                type="text"
                labelText="Estado"
              />
              <StyledField
                name="shippingZipCode"
                type="number"
                labelText="Código postal"
              />
              <StyledButton
                isLoading={isSubmitting}
                disabled={!isValid}
                type="submit"
                text="Registrarse"
                loadingText="Procesando"
              />
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
}
