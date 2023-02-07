import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchMorePokemon, fetchAllPokemon, fetchPokemon } from "../../redux/actions/pokemon";
import styled from "styled-components";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import {  isFetchingMorePokemonsSel, pokemonInfoSel } from "../../redux/selectors";
import Preview from "./components/Preview";
import ListItem from "./components/ListItem";
import Loader from "./components/Loader";
import axios from "axios";
// import PokemonList from "./components/PokemonList";


const GridContainer = styled.div`
    display: grid;
    height: 90vh;
    margin: 3%;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
    @media (min-width: 768px){    
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        margin: 0 6%;
        column-gap: 2rem;
    }
    @media (min-width: 1024px){
        margin: 0 10%;
    }
`
const PokemonList = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
    column-gap: 1rem;
    row-gap: 1rem;
    height: 80%;
    margin: 0 3%;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: #ededed;
    @media (min-width: 768px){
        padding: 0 1rem;   
        justify-content: normal;  
        display: grid;
        grid-template-rows: auto;
        overflow-x: hidden;
        overflow-y: auto;
        max-width: 400px;
    }
    @media (min-width: 1444px){
        margin: 0 20%;
    }
`

const AllPokemon = () => {
    const dispatch = useDispatch();
    // const isFetchingMorePokemons = useSelector(isFetchingMorePokemonsSel, shallowEqual)
    const { pokemons, pokemon  } = useSelector(pokemonInfoSel);
    const [preview, setPreview] = useState({name: "?????",faQuestion})
    useEffect(() => {
        if(pokemon.name){
            setPreview(pokemon);
            console.log(preview);
        }
    }, [pokemon])
    const handleClick = (prev) => {
        dispatch(fetchPokemon(prev.name));
    };
    return (<GridContainer>
        <Preview pokemon={preview} />
        
        <PokemonList>
        {pokemons.results?.map((pokemon, i) => <ListItem key={i} pokemon={pokemon} handleClick={()=> handleClick(pokemon)}/>)}
        </PokemonList>
        </GridContainer>)
}

export default AllPokemon;
{/* {pokemons.results &&  */}
// hasNextPage={pokemons.next? true : false}
            // items={pokemons}
            // isFetchingMorePokemons={isFetchingMorePokemons}
            // loadNextPage={()=>dispatch(fetchMorePokemon(pokemons.next))}
            // handleClick={handleClick}