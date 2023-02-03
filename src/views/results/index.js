import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchPokemon } from "../../redux/actions/pokemon";
import { pokemonInfoSel, isFetchingPokemonSel, errorFetchingPokemonSel } from "../../redux/selectors";
import Info from "./components/Info";
import Evolutions from "./components/Evolutions";
import { H2 } from "../../theme";

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

const Results = () => {
    const { pokemonName } = useParams();
    const [firstLoad, setFirstLoad] = useState(true);
    const [pokemonImg, setPokemonImg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pokemon } = useSelector(pokemonInfoSel)
    const isFetchingPokemon = useSelector(isFetchingPokemonSel, shallowEqual);
    const errorFetchingPokemon = useSelector(errorFetchingPokemonSel, shallowEqual);
    useEffect(() => {
        dispatch(fetchPokemon(pokemonName));
    }, [pokemonName])

    useEffect(() => {
        if(pokemon.sprites) setPokemonImg(pokemon.sprites.front_default);
    }, [pokemon])

    useEffect(() => {
        if (errorFetchingPokemon && !pokemon.name && !firstLoad) {
            navigate("/pokemon/NotFound", { replace: true });
        }
        setFirstLoad(false);
    }, [errorFetchingPokemon])
    // data.name.charAt(0).toUpperCase() + data.name.slice(1)
    const setSprite = url => setPokemonImg(url);
    return (<>
        {!isFetchingPokemon && !errorFetchingPokemon && !firstLoad && (<Div>
            <H2 gridArea="name">{pokemon.name?.replace("-", " ")}</H2>
            <Img src={pokemonImg} alt={pokemon?.name} />
            <Info gridArea="info" setSprite={setSprite}/>
            <Evolutions gridArea="evolutions" />
        </Div>
        )}
    </>
    )
}

export default Results;