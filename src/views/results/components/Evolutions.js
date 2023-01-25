import { useSelector } from "react-redux";
import styled from "styled-components";

import { pokemonInfoSel, isFetchingPokemonSel } from "../../../redux/selectors";
import { useEffect, useState } from "react";
import PokemonEvolve from "./PokemonEvolve";

const H3 = styled.h3`
    font-size: ${({theme}) => theme.font.size.medium};
    margin-left: 25%;
`

const Div = styled.div`
    margin-top: 1em;
    grid-area: ${({gridArea}) => gridArea};  
    height: fit-content;
    padding: 0;
`

const Evolution = styled.div`
    display: flex;
    margin: 1em 15%;
    justify-content: space-around;
`

const Evolutions = ({gridArea}) => {
    const { pokemonEvolutions } = useSelector(pokemonInfoSel);

    return (<Div gridArea={gridArea}>
        <H3>Evolutions</H3>
        <Evolution>
            {pokemonEvolutions.map( (evolution, i) => <PokemonEvolve key={i} evolution={evolution} index={i}/> )}
        </Evolution>
    </Div>)
};

export default Evolutions;