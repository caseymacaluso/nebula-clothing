import { createGlobalStyle } from "styled-components";
import { SCREEN_SIZE } from "./constants";

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Open Sans';
        padding: 20px 40px;

        @media screen and (max-width: ${SCREEN_SIZE.md}px) {
            padding: 10px;
        }
    }
    a {
        text-decoration: none;
        color: black;
    }
    * {
        box-sizing: border-box;
    }
`;
