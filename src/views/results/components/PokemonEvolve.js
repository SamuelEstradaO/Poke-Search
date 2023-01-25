import { Link } from "react-router-dom";
import styled from "styled-components";

const H6 = styled.h6`
    font-size: ${({theme})=> theme.font.size.small};
    margin: 1em 10% ;
`

const PokemonLink = styled(Link)`
    flex: 0 1 20%;
    height: auto;
    text-align: center;
`

const Img = styled.img`
    object-fit: contain;
    background-color: red;
    border-radius: 50%;
    width: 95%;
`

const PokemonEvolve = ({evolution, index}) => {

    return (<PokemonLink to={`/pokemon/${evolution.name}`}>
        <Img src={evolution.sprite} alt={evolution.name}/>
        <H6>{evolution.name.replace("-", " ")}</H6>
    </PokemonLink>)
}

export default PokemonEvolve;