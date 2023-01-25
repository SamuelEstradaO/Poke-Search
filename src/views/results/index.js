import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchPokemon } from "../../redux/actions/pokemon";
import { pokemonInfoSel, isFetchingPokemonSel, errorFetchingPokemonSel } from "../../redux/selectors";
import Info from "./components/Info";
import Evolutions from "./components/Evolutions";

const Div = styled.div`
    display: grid;
    grid-template-areas: 
        "name name name"
        "sprite info ."
        "sprite info ."
        "sprite info ."
        "sprite info ."
        "evolutions evolutions evolutions";
        align-items: center; 
`

const Img = styled.img`
    grid-area: sprite;
    display: inline-block;
    justify-self: end;
    height: 100%;
    object-fit: contain;
`

const H2 = styled.h2`
    grid-area: name;
    text-align: center;
    font-size: ${({ theme }) => theme.font.size.large};
`

const Results = () => {
    const { pokemonName } = useParams();
    const [firstLoad, setFirstLoad] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pokemon } = useSelector(pokemonInfoSel)
    const isFetchingPokemon = useSelector(isFetchingPokemonSel, shallowEqual);
    const errorFetchingPokemon = useSelector(errorFetchingPokemonSel, shallowEqual);
    useEffect(() => {
        dispatch(fetchPokemon(pokemonName));
    }, [pokemonName])

    useEffect(() => {
        if (errorFetchingPokemon && !pokemon.name && !firstLoad) {
            navigate("/pokemon/NotFound", { replace: true });
        }
        setFirstLoad(false);
    }, [errorFetchingPokemon])
    // data.name.charAt(0).toUpperCase() + data.name.slice(1)
    return (<>
        {!isFetchingPokemon && !errorFetchingPokemon && !firstLoad && (<Div>
            <H2>{pokemon.name?.replace("-", " ")}</H2>
            <Img src={pokemon.sprites?.front_default} alt={pokemon?.name} />
            <Info gridArea="info" />
            <Evolutions gridArea="evolutions" />
        </Div>
        )}
    </>
    )
}

export default Results;