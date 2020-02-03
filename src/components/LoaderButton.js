import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from { transform: scale(1) rotate(0deg); }
    to { transform: scale(1) rotate(360deg); }
`;

const RotatingGlyp = styled(FontAwesomeIcon)`
  margin-right: 7px;
  top: 2px;
  animation: ${rotate} 1s infinite linear;
`;

const Button = styled.button`
  outline: none;
  border: none;
  padding: none;
  font-family: "Montserrat", sans-serif;
  display: block;
  background-color: ${props => (props.disabled ? "#6f372d60" : "#6f372d")};
  width: 150px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: white;
  cursor: ${props => (props.disabled ? "no-drop" : "pointer")};
  user-select: none;

  -webkit-box-shadow: 2px 6px 9px 0px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 2px 6px 9px 0px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 6px 9px 0px rgba(0, 0, 0, 0.57);
`;

export default ({
  isLoading = false,
  text,
  loadingText,
  disabled = false,
  onClickProp,
  className,
  type
}) => {
  const shouldDisable = isLoading || disabled;
  const onClick = shouldDisable ? null : onClickProp;
  return (
    <Button
      type={type}
      disabled={shouldDisable}
      onClick={onClick}
      className={className}
    >
      {isLoading && <RotatingGlyp icon={faSpinner} />}
      {isLoading ? loadingText : text}
    </Button>
  );
};
