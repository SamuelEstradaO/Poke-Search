import { useSelector } from "react-redux";
import styled from "styled-components";

import { pokemonInfoSel } from "../../../redux/selectors";
import PokemonEvolve from "./PokemonEvolve";
import { H4 as H4Base } from "../../../theme";

const H4 = styled(H4Base)`
    margin-left: 10%;
    margin-top: 1em;
    -webkit-text-stroke: 1px black;
    -webkit-text-fill-color: white;
`

const Div = styled.div`
    margin: 1em 15% 1em 15%;
    grid-area: ${({ gridArea }) => gridArea};  
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
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 1em;
    align-items: center;
    row-gap: 1rem;
    @media (min-width: 768px){
        flex-direction: row;
    }
`

const Evolutions = ({ gridArea }) => {
    const { pokemonEvolutions, pokemon: { types } } = useSelector(pokemonInfoSel);

    return (<>{
        types && (<Div gridArea={gridArea} pokeType={types[0].type.name}>
            <H4>Evolutions</H4>
            <Evolution >
                {pokemonEvolutions.map((evolution, i) => <PokemonEvolve key={i} evolution={evolution} />)}
            </Evolution>
        </Div>)
    }</>)
};

export default Evolutions;