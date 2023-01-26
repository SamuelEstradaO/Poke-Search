import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { Img } from "../../theme";

const Banner = styled.header`
    background-color: ${({theme})=> theme.colors.bannerBg};
`
const HomeLink = styled(Link)`
    display: flex;
    text-decoration: none;
    width: fit-content;
    padding: 5px;
`
const H1 = styled.h1 `
    -webkit-text-stroke: 1px ${({theme})=> theme.colors.bannerTextOutline};
    -webkit-text-fill-color: ${({theme})=> theme.colors.bannerText};
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
`

const Header = () => {
    return (<>
        <Banner>
            <HomeLink to={"/"} replace={false}>
            <H1>Poke-Search</H1>
            <ImgContainer>
                <Img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="pokeball"/>
            </ImgContainer>
            </HomeLink>
            
        </Banner>
        <Outlet />
        </>)
}

export default Header;