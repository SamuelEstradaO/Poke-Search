import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchPokemon } from "../../redux/actions/pokemon";

const Results = () => {
    const { pokemonName } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPokemon(pokemonName))
    },[])

    return (<>
        <p>{pokemonName}</p>
    </>)
}

export default Results;