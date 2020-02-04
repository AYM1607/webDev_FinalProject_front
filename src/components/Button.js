import styled from "styled-components";

export default styled.button`
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
