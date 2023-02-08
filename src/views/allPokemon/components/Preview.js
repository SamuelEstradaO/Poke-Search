import styled from "styled-components";
import { FontAwesome, H2 as H2Base } from "../../../theme";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const Grid = styled.div`
    display: grid;
    position: relative;
    grid-template-rows: 1fr 5fr;
    justify-items: center;
    height: 65%;
    min-height: 250px;
    grid-row: 2;
    @media(min-width: 768px){
        grid-row: 2;
        grid-column: 1;
    }
`

const ImgContainer = styled.div`
    height: 90%;
    height: -webkit-fill-available;
    max-height: 400px;
    position: relative;
    width: 100%;
    text-align: center;
    & span{
        position: absolute;
        visibility: hidden;
        background-color: black;
        opacity: 0; 
        transition: opacity 1s;
        top: -5px;
        right: 105%;
        padding: 5px;
        width: fit-content;
        border-radius: 5px;
        font-size: ${({ theme }) => theme.font.size.mobile.small};
        @media (min-width: 768px){
            top: 100%;
            left: 50%;
            margin-left: -25%;
            font-size: ${({ theme }) => theme.font.size.desktop.small};
    }
    &.PopUp {
        visibility: visible;
        color: white;
        opacity: 1;
    }
    }
`
const Img = styled.img`
    height: inherit;
    aspect-ratio: initial;
`
const H2 = styled(H2Base)`
    margin: 0%;
`
const IconContainer = styled(Link)`
    position: relative;
    text-decoration: none;
    color: black;
    font-size: ${({ theme }) => theme.font.size.mobile.large};
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.medium};
    }
    @media (min-width: 1024px){
        font-size: ${({ theme }) => theme.font.size.desktop.large};
    }
    &:hover{
        color: ${({ theme }) => theme.colors.bannerBg}
    }
`

const FontAwesomeIcon = styled(FontAwesome)`
font-size: inherit;
`

const Preview = ({ pokemon }) => {
    const [popUp, setPopUp] = useState("");
    const handleHover = () => setPopUp("PopUp");
    const handleMouseLeave = () => setPopUp("");
    return (<Grid>
        <H2>{pokemon.species ? `#${pokemon.species.url?.slice(42, -1)} ${pokemon.name.replace("-", " ")}` : pokemon.name}</H2>
        {pokemon.sprites ?
            <ImgContainer>
                <Img src={pokemon.sprites.front_default} />
                {pokemon.species && <IconContainer to={`/pokemon/${pokemon.species.url.slice(42, -1)}`} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                </IconContainer>}
                <span className={popUp}>See detailed info</span>
            </ImgContainer> :
            <FontAwesome icon={pokemon.faQuestion} />}
    </Grid>)
}

export default Preview;