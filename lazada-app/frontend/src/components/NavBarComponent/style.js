import styled from "styled-components";

export const WrapperLableText = styled.h4`
  color: rgb(56, 56, 61);
  font-size: 14px;
  font-weight: 500;
  margin-top: 20px;
`;

export const WrapperTextValue = styled.span`
  color: rgb(56, 56, 61);
  font-size: 15px;
  font-weight: 400;
`;

export const WrapperContent = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 12px;
`;

export const WrapperTextPrice = styled.div`
  padding: 4px;
  color: rgb(56, 56, 61);
  border-radius: 10px;
  background-color: rgb(238, 238, 238);
  width: fit-content;
`;

export const LineBreak = styled.hr`
  border-bottom: 2px solid #eee;
  width: 200px;
  height: 5px;
`;
