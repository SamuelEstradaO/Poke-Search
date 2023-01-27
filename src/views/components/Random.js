import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pokemonInfoSel } from "../../redux/selectors";
import { fetchAllPokemon } from "../../redux/actions/pokemon";


const Random = () => {
    const { pokemons } = useSelector(pokemonInfoSel, shallowEqual);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getRandomNum = (total) => Math.ceil(Math.random()*total);

    useEffect(() => {
        if (pokemons.count)
            navigate(`/pokemon/${getRandomNum(pokemons.count)}`, { replace: true });
    }, [pokemons])
    useEffect(() => {
        dispatch(fetchAllPokemon());
    },[])
    return (<>
    </>)
}

export default Random;