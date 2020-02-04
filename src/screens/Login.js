import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import FloatingLabelField from "../components/FloatingLabelField";
import LoaderButton from "../components/LoaderButton";

import { querystring } from "../lib/core";
import { login } from "../lib/api";

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
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 992px) {
    & {
      margin-right: 0;
    }
  }
`;

const formSchema = Yup.object().shape({
  email: Yup.string()
    .required("Por favor proporciona tu correo electrónico")
    .email("Ingresa una dirección válida"),
  password: Yup.string()
    .required("Por favor proporciona tu contraseña")
    .min(8, "Tu contraseña debe tener al menos 8 caracteres")
});

export default function Login(props) {
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await login(values.email, values.password);
      const redirectPath = querystring("redirect") || "/";
      props.history.push(redirectPath);
    } catch (e) {
      alert("Uuppss... Intentalo de nuevo");
      resetForm();
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
  };
  return (
    <>
      <Title>Inicia sesión</Title>
      <FormContainer>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <FloatingLabelField
                name="email"
                type="email"
                labelText="Correo electrónico"
              />
              <StyledField
                name="password"
                type="password"
                labelText="Contraseña"
              />
              <StyledButton
                isLoading={isSubmitting}
                disabled={!isValid}
                type="submit"
                text="Iniciar sesión"
                loadingText="Procesando"
              />
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
}
