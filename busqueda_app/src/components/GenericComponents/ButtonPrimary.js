import React from "react";
import styled from "styled-components";

const ButtonNeutralBtn = styled.button`

  padding: 10px 7px 10px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.21);
  background-color: var(--ocean-blue);
  border: none;
`;
const Value = styled.div`
  font-size: 1.4rem;
  margin: auto;
  height: 16px;
  text-align: center;
  color: #ffffff;
  width: 93px;
  height: 16px;
  line-height: normal;
`;

const ButtonPrimary = ({ text, classProps }) => {
  return (
    <ButtonNeutralBtn className={classProps}>
      <Value>{text}</Value>
    </ButtonNeutralBtn>
  );
};

export default ButtonPrimary;
