import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import { createProduct } from "../lib/api";

import FloatingLabelField from "../components/FloatingLabelField";
import LoaderButton from "../components/LoaderButton";

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 992px) {
    & {
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
`;

const ImageInputContainer = styled.div`
  text-align: center;
  @media (min-width: 992px) {
    & {
      width: 40%;
      margin: 0;
    }
  }
`;

const FormContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  margin: 40px auto;
  width: 80%;

  @media (min-width: 992px) {
    & {
      width: 40%;
      margin: 0;
    }
  }
`;

const ImagePlaceholder = styled.div`
  width: 400px;
  height: 400px;
  background-color: lightgray;

  @media (min-width: 992px) {
    & {
      margin: 0 auto;
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  font-family: Jim Nightshade, cursive;
  padding-top: 60px;
`;

const StyledFileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const StyledField = styled(FloatingLabelField)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyledImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
  object-position: center;
  border: 1px solid lightgray;

  @media (min-width: 992px) {
    & {
      margin: 0 auto;
    }
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
  background-color: #6f372d;
  color: white;
  padding: 10px;
  margin: 10px auto;
  width: 200px;
  display: block;
  text-align: center;
  font-family: "Montserrat", sans-serif;
`;

const StyledButton = styled(LoaderButton)`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const formSchema = Yup.object().shape({
  name: Yup.string().required("Por favor proporciona un nombre"),
  description: Yup.string().required("Por favor proporciona una descripción"),
  price: Yup.string().required("Por favor proporciona un precio")
});

export default function NewProduct(props) {
  const [image, setImage] = useState(null);
  const [localImageUrl, setLocalImageUrl] = useState();

  const handleImageChange = async event => {
    setImage(event.target.files[0]);
    setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!image) {
      alert("Es necesario seleccionar un archivo.");
      setSubmitting(false);
      return;
    }
    try {
      await createProduct(
        { ...values, price: Number(values.price) * 100 },
        image
      );
      props.history.push("/admin");
    } catch (e) {
      console.log(e);
      alert("Lo sentimos, no pudimos agregar el producto");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Title>Crear nuevo producto</Title>
      <InnerContainer>
        <FormContainer>
          <Formik
            initialValues={{
              name: "",
              price: "",
              description: "",
              category: "carteras"
            }}
            onSubmit={handleSubmit}
            validationSchema={formSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form>
                <StyledField name="name" labelText="Nombre" type="text" />
                <StyledField
                  name="description"
                  labelText="Descripción"
                  type="text"
                />
                <StyledField name="price" labelText="Precio" type="number" />
                <FloatingLabelField
                  name="category"
                  labelText="Categoría"
                  component="select"
                >
                  <option value="carteras">Carteras</option>
                  <option value="maletines">Maletines</option>
                  <option value="zapatos">Zapatos</option>
                </FloatingLabelField>
                <StyledButton
                  type="submit"
                  text="Crear"
                  isLoading={isSubmitting}
                  disabled={!isValid}
                />
              </Form>
            )}
          </Formik>
        </FormContainer>
        <ImageInputContainer>
          {image ? <StyledImage src={localImageUrl} /> : <ImagePlaceholder />}
          <StyledFileInput
            id="imageInput"
            type="file"
            accept=".png"
            onChange={handleImageChange}
          />
          <StyledLabel htmlFor="imageInput">Seleccionar archivo</StyledLabel>
        </ImageInputContainer>
      </InnerContainer>
    </>
  );
}
