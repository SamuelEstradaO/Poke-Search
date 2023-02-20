import { createContext, useContext, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const Banner = styled.header`
    background-color: ${({ theme }) => theme.colors.bannerBg};
    width: 100%;
    height: fit-content;
    max-height: 75px;
    position: sticky;
    top: 0;
    z-index: 1;
`
const HomeLink = styled(Link)`
    display: flex;
    text-decoration: none;
    width: fit-content;
`
const H1 = styled.h1`
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.bannerTextOutline};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.bannerText};
    margin-left: 5px;
    font-size: ${({ theme }) => theme.font.size.mobile.large};
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.large};
    }
`
const ImgContainer = styled.div`
    height: inherit;
    max-height: 75px;
    aspect-ratio: 1/1;
    width: fit-content;
`
const Img = styled.img`
object-fit: contain;
aspect-ratio: 1/1;
height: 100%;
`

export const HeaderContext = createContext({});

const Header = () => {
    const ref = useRef();
    return (<HeaderContext.Provider value={ref}>
        <Banner ref={ref}>
            <HomeLink to={"/"} replace={false}>
                <H1>Poke-Search</H1>
                <ImgContainer>
                    <Img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="pokeball" />
                </ImgContainer>
            </HomeLink>

        </Banner>
        <Outlet />
    </HeaderContext.Provider>)
}

export default Header;