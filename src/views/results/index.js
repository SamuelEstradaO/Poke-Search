import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchPokemon } from "../../redux/actions/pokemon";
import { pokemonInfoSel, isFetchingPokemonSel, errorFetchingPokemonSel } from "../../redux/selectors";
import Info from "./components/Info";

const Div = styled.div`
    display: grid;
    grid-template-areas: 
        "name name name"
        "sprite info ."
        "sprite info ."
        "sprite info ."
        "sprite info ."
        "evolutions evolutions evolutions";
    & img{
        grid-area: ${({area})=> area};
        height: 100%;
    }
`
const H2 = styled.h2`
    grid-area: name;
    text-align: center;
`

const Results = () => {
    const { pokemonName } = useParams();
    const [firstLoad, setFirstLoad] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pokemon, pokemonEvolutions } = useSelector(pokemonInfoSel)
    const isFetchingPokemon = useSelector(isFetchingPokemonSel, shallowEqual);
    const errorFetchingPokemon = useSelector(errorFetchingPokemonSel, shallowEqual);

    useEffect(() => {
        dispatch(fetchPokemon(pokemonName));
    }, [pokemonName])

    useEffect(()=>{
        if(errorFetchingPokemon && !pokemon.name && !firstLoad){
            navigate("/pokemon/NotFound", {replace: true});
        }
        setFirstLoad(false);
    }, [errorFetchingPokemon])
    
    return (<>
        {!isFetchingPokemon && !errorFetchingPokemon && (<Div>
            <H2>{pokemon.name}</H2>
            <img src={pokemon.sprites?.front_default} alt={pokemon?.name} area="sprite"/>
            <Info gridArea="info"/>
            </Div>
        )}
    </>
    )
}

export default Results;