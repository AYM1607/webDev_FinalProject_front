import React from "react";
import styled, { css } from "styled-components";

const leftAlignMixin = css`
  margin-right: auto;
`;
const rightAlignMixin = css`
  margin-left: auto;
`;

const Button = styled.div`
  padding: 0;
  margin: 0;
  user-select: none;
  display: block;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: all;
  transition-property: all;
  font-size: 40px;
  line-height: 40px;
  width: 24px;
  opacity: 0.5;
  ${props => (props.alignLeft ? leftAlignMixin : "")}
  ${props =>
    props.alignRight ? rightAlignMixin : ""}

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    opacity: 1;
  }
`;

export default function ClosingButton(props) {
  return <Button onClick={props.onClick}>&times;</Button>;
}
