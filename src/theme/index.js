import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { createGlobalStyle } from "styled-components";

const theme = {
    types: {
        grass: { light: "rgb(160, 235, 99)", dark: "rgb(61, 153, 11)" },
        dark: { light: "rgb(83, 61, 49)", dark: "rgb(59, 45, 34)" },
        dragon: { light: "rgb(146, 111, 255)", dark: "rgb(80, 64, 156)" },
        electric: { light: "rgb(255, 209, 39)", dark: "rgb(231, 146, 0)" },
        fairy: { light: "rgb(255, 190, 250)", dark: "rgb(226, 143, 225)" },
        fighting: { light: "rgb(165, 70, 41)", dark: "rgb(93, 34, 19)" },
        fire: { light: "rgb(255, 89, 19)", dark: "rgb(201, 34, 3)" },
        flying: { light: "rgb(166, 177, 255)", dark: "rgb(92, 116, 214)" },
        ghost: { light: "rgb(119, 121, 209)", dark: "rgb(66, 69, 145)" },
        bug: { light: "rgb(226, 242, 111)", dark: "rgb(137, 150, 13)" },
        ground: { light: "rgb(253, 220, 129)", dark: "rgb(173, 150, 91)" },
        ice: { light: "rgb(177, 229, 255)", dark: "rgb(109, 210, 245)" },
        normal: { light: "rgb(236, 232, 218)", dark: "rgb(172, 166, 146)" },
        poison: { light: "rgb(196, 120, 195)", dark: "rgb(100, 40, 102)" },
        psychic: { light: "rgb(255, 96, 141)", dark: "rgb(200, 60, 106)" },
        rock: { light: "rgb(241, 221, 159)", dark: "rgb(155, 135, 60)" },
        steel: { light: "rgb(237, 238, 250)", dark: "rgb(143, 142, 159)" },
        water: { light: "rgb(109, 173, 255)", dark: "rgb(12, 103, 194)" },
    },
    colors: {
        bannerBg: "#c91d19",
        bannerText: "#EFC707",
        bannerTextOutline: "#50609e"
    },
    font: {
        size: {
            mobile: {
                large: "5vw",
                medium: "4vw",
                small: "3vw"
            },
            desktop: {
                large: "2rem",
                medium: "1.5rem",
                small: "0.8rem"
            }
        }
    }
};

export const GlobalStyler = createGlobalStyle`
    *{
        box-sizing: border-box;
        font-size: 16px;
        font-family: 'Press Start 2P', cursive;
    }
    strong{
        font-size: inherit;
    }
`

export const H2 = styled.h2`
    grid-area: ${({ gridArea }) => gridArea};
    text-align: center;
    font-size: ${({ theme }) => theme.font.size.mobile.large};
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.medium};
    }
    @media (min-width: 1024px){
        font-size: ${({ theme }) => theme.font.size.desktop.large};
    }
`
export const FontAwesome = styled(FontAwesomeIcon)`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: calc(${({ theme }) => theme.font.size.mobile.large}*2.5);
    @media (min-width: 768px){
        font-size: calc(${({ theme }) => theme.font.size.desktop.large}*2.5);
    }
`
export const H6 = styled.h6`
    font-size: ${({ theme }) => theme.font.size.mobile.small};
    margin: 1em 10% ;
    color: white;
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.small};
    }
`
export const H4 = styled.h4`
font-size: ${({ theme }) => theme.font.size.mobile.medium};
@media (min-width: 768px){
    font-size: ${({ theme }) => theme.font.size.desktop.small};
}
@media (min-width: 1024px){
    font-size: ${({ theme }) => theme.font.size.desktop.medium};
}
`
export const P = styled.p`
font-size: ${({ theme }) => theme.font.size.mobile.medium};
@media (min-width: 768px){
    font-size: ${({ theme }) => theme.font.size.desktop.small};
}
@media (min-width: 1024px){
    font-size: ${({ theme }) => theme.font.size.desktop.medium};
}
`

export default theme;

