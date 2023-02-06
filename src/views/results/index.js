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
    align-items: center;
    grid-template-areas:
        "name"
        "sprite"
        "info"
        "evolutions";
    @media (min-width: 768px){
        grid-template-areas: 
            "name name name"
            "sprite info ."
            "evolutions evolutions evolutions";
    }
`

const Img = styled.img`
    grid-area: sprite;
    display: inline-block;
    justify-self: center;
    width: 80%;
    max-width: 345px;
    object-fit: contain;
    @media(min-width: 768px){
        justify-self: end;
        width: auto;
        height: 70%;
    }
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
        {!isFetchingPokemon && !errorFetchingPokemon && !firstLoad && pokemon.name &&(<Div>
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