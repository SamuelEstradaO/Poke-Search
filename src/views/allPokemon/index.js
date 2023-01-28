import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemon, fetchPokemon } from "../../redux/actions/pokemon";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { pokemonInfoSel } from "../../redux/selectors";
import Preview from "./components/Preview";
import ListItem from "./components/ListItem";


const GridContainer = styled.div`
    display: grid;
    height: 90vh;
    margin: 0 5%;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    column-gap: 2rem;
    @media (min-width: 768px){    
        margin: 0 15%;
    }
`
const PokemonList = styled.div`
    display: grid;
    grid-template-rows: auto;
    justify-items: center;
    row-gap: 1rem;
    height: 80%;
    border: 1px solid aqua;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #ededed;
`

const AllPokemon = () => {
    const { pokemons, pokemon } = useSelector(pokemonInfoSel);
    const dispatch = useDispatch();
    const [preview, setPreview] = useState({name: "?????",faSearch})
    useEffect(() => {
        dispatch(fetchAllPokemon());
    }, []);
    useEffect(() => {
        if(pokemon.name){
            setPreview(pokemon);
            console.log(preview);
        }
    }, [pokemon])
    const handleClick = (prev) => {
        console.log("here");
        dispatch(fetchPokemon(prev.name));
    };
    return (<GridContainer>
        <Preview pokemon={preview} />
        <PokemonList>
            {pokemons.results?.map((pokemon, i) => <ListItem key={i} pokemon={pokemon} onClick={()=> handleClick(pokemon)}/>)}
        </PokemonList>
    </GridContainer>)
}

export default AllPokemon;