import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPokemon } from "../../redux/actions/pokemon";
import { pokemonInfoSel, isFetchingPokemonSel } from "../../redux/selectors";

const Results = () => {
    const { pokemonName } = useParams();
    const dispatch = useDispatch();
    const {pokemon, pokemonEvolutions} = useSelector(pokemonInfoSel)
    const isFetchingPokemon = useSelector(isFetchingPokemonSel);
    useEffect(() => {
        pokemonName && dispatch(fetchPokemon(pokemonName))
    },[pokemonName])

    return (<>
        {!isFetchingPokemon && (<>
            <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
            </>)}
            </>
    )
}

export default Results;