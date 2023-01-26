import { useSelector } from "react-redux";
import styled from "styled-components";

import { pokemonInfoSel } from "../../../redux/selectors";
import PokemonEvolve from "./PokemonEvolve";

const H3 = styled.h3`
    font-size: ${({theme}) => theme.font.size.medium};
    margin-left: 10%;
    margin-top: 1em;
    -webkit-text-stroke: 1px black;
    -webkit-text-fill-color: white;
`

const Div = styled.div`
    margin: 1em 15% 1em 15%;
    grid-area: ${({gridArea}) => gridArea};  
    height: fit-content;
    background-color: ${({ theme: { types }, pokeType }) => types[pokeType].dark};
    background-image: linear-gradient( to right bottom,
        ${({ pokeType, theme: { types } }) => types[pokeType].light} 0 5%,
        ${({ pokeType, theme: { types } }) => types[pokeType].dark} 40% 60%,
        ${({ pokeType, theme: { types } }) => types[pokeType].light} 95% 100%
    );
    border-radius: 0 1em;
`

const Evolution = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
`

const Evolutions = ({gridArea}) => {
    const { pokemonEvolutions, pokemon: {types} } = useSelector(pokemonInfoSel);

    return (<Div gridArea={gridArea} pokeType={types[0].type.name}>
        <H3>Evolutions</H3>
        <Evolution >
            {pokemonEvolutions.map( (evolution, i) => <PokemonEvolve key={i} evolution={evolution}/> )}
        </Evolution>
    </Div>)
};

export default Evolutions;