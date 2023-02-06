import { Link } from "react-router-dom";
import styled from "styled-components";
import { H6 } from "../../../theme";

const PokemonLink = styled(Link)`
    flex: 0 1 20%;
    height: auto;
    text-align: center;
    text-decoration: none;
    color: black;
    border-radius: 0 1em;
    background-color: rgba(0,0,0, 0.4);
    width: 70%;
    &:hover{
        background-color: rgba(0,0,0, 0.7);
        transform: scale(1.1, 1.1);
        transition: transform 1s;
    }
`

const Img = styled.img`
    margin-top: 5%;
    object-fit: contain;
    width: 95%;
`


const PokemonEvolve = ({ evolution }) => {

    return (<PokemonLink to={`/pokemon/${evolution.url.slice(42, -1)}`} >
        <Img src={evolution?.sprite} alt={evolution.name} />
        <H6>{evolution.name.replace("-", " ")}</H6>
    </PokemonLink>)
}

export default PokemonEvolve;