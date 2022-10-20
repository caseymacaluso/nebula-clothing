import styled from "styled-components";
import { SCREEN_SIZE } from "../../constants";

export const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: ${SCREEN_SIZE.lg}px) {
    flex-wrap: none;
    flex-direction: column;
  }
`;
