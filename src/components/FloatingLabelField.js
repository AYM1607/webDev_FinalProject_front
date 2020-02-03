import React, { Component } from "react";
import styled from "styled-components";
import { Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const FieldContainer = styled.div`
  position: relative;
`;

const StyledField = styled(Field)`
  -webkit-appearance: none;
  width: ${props => (props.inRow ? "90%" : "100%")};
  border: 0;
  font-family: inherit;
  height: 48px;
  font-size: 25px;
  font-weight: 700;
  border-bottom: 2px solid #c8ccd4;
  background-color: white;
  border-radius: 0;
  color: #223254;
  transition: all 0.15s ease;

  &:focus {
    background-color: none;
    outline: none;
    border-bottom: 2px solid #3f220f;
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    transform: translate3d(0, -100%, 0);
    opacity: 1;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  transition: all 200ms;
  opacity: 0.5;
  text-transform: uppercase;
  font-family: inherit;
  font-weight: 400;
  margin: 0;
`;

const ShowHideButton = styled(FontAwesomeIcon)`
  position: relative;
  float: right;
  margin-top: -30px;
  margin-right: 10px;
  z-index: 20;
  color: #6f372d;
  user-select: none;
  cursor: pointer;
`;

const SelectArrow = styled.i`
  position: relative;
  float: right;
  margin-top: -30px;
  margin-right: 10px;
`;

const ErrorMessageContainer = styled.div`
  margin-top: 4px;
  color: lightcoral;
`;

class FloatingLabelField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  render() {
    const {
      type,
      name,
      labelText,
      children,
      component,
      readOnly,
      inRow
    } = this.props;
    const { showPassword } = this.state;

    return (
      <FieldContainer className={`${this.props.className || ""}`}>
        <StyledField
          inRow={inRow}
          readOnly={readOnly}
          component={component}
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder="&nbsp;"
        >
          {children}
        </StyledField>
        <StyledLabel>{labelText}</StyledLabel>
        {type === "password" ? (
          <ShowHideButton
            type="button"
            onClick={this.toggleShowPassword}
            icon={this.state.showPassword ? faEye : faEyeSlash}
          ></ShowHideButton>
        ) : (
          ""
        )}

        {component && component === "select" ? (
          <SelectArrow className={`fas fa-sort-down`} />
        ) : (
          ""
        )}
        <ErrorMessage
          name={name}
          render={errMessage => (
            <ErrorMessageContainer>{errMessage}</ErrorMessageContainer>
          )}
        />
      </FieldContainer>
    );
  }
}

export default FloatingLabelField;
