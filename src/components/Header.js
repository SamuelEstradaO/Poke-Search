import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const Img = styled.img`
    object-fit: contain;
`
const Banner = styled.header`
    background-color: ${({theme})=> theme.colors.bannerBg};
`
const HomeLink = styled(Link)`
    display: flex;
    text-decoration: none;
    width: fit-content;
`
const H1 = styled.h1 `
    font-size: ${({theme})=> theme.font.size.medium};
    -webkit-text-stroke: 1px ${({theme})=> theme.colors.bannerTextOutline};
    -webkit-text-fill-color: ${({theme})=> theme.colors.bannerText};
`

const Header = () => {
    return (<>
        <Banner>
            <HomeLink to={"/"} replace={false}>
            <Img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="pokeball"/>
            <H1>Poke-Search</H1>
            </HomeLink>
            
        </Banner>
        <Outlet />
        </>)
}

export default Header;