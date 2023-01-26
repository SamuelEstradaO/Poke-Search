import { Link } from "react-router-dom";
import styled from "styled-components";

const H6 = styled.h6`
    font-size: ${({ theme }) => theme.font.size.small};
    margin: 1em 10% ;
    color: white;
`

const PokemonLink = styled(Link)`
    flex: 0 1 20%;
    height: auto;
    text-align: center;
    text-decoration: none;
    color: black;
    border-radius: 0 1em;
    background-color: rgba(0,0,0, 0.4);
    &:hover{
        background-color: rgba(0,0,0, 0.7);
    }
`

const Img = styled.img`
    margin-top: 5%;
    object-fit: contain;
    width: 95%;
`

const PokemonEvolve = ({ evolution }) => {

    return (<PokemonLink to={`/pokemon/${evolution.name}`} >
        <Img src={evolution.sprite} alt={evolution.name} />
        <H6>{evolution.name.replace("-", " ")}</H6>
    </PokemonLink>)
}

export default PokemonEvolve;