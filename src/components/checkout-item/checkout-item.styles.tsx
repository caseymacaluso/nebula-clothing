import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  .name,
  .price {
    width: 23%;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const RemoveButton = styled.span`
  padding-left: 12px;
  cursor: pointer;
`;

export const QuantityContainer = styled.div`
  width: 23%;
  display: flex;
`;

export const Arrow = styled.span`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;
