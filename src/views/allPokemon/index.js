import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import { fetchMorePokemon, fetchAllPokemon, fetchPokemon } from "../../redux/actions/pokemon";
import { isFetchingMorePokemonsSel, pokemonInfoSel } from "../../redux/selectors";
import Preview from "./components/Preview";
import ListItem from "./components/ListItem";
import Loader from "./components/Loader";
import axios from "axios";
import InputField from "../search/components/InputField";
// import PokemonList from "./components/PokemonList";


const GridContainer = styled.div`
    display: grid;
    height: 90vh;
    margin: 3%;
    grid-template-rows: 10% 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
    @media (min-width: 768px){    
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 10% 90%; 
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
    grid-row: 3;
    @media (min-width: 768px){
        padding: 0 1rem;   
        justify-content: normal;  
        display: grid;
        grid-template-rows: auto;
        overflow-x: hidden;
        overflow-y: auto;
        max-width: 400px;
        grid-row: 2;
        grid-column: 2;
    }
    @media (min-width: 1444px){
        margin: 0 20%;
    }
`
const gridArea = {
    mobile: "grid-row: 1;",
    desktop: "grid-column: 1 / span 2;"
}

const AllPokemon = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchText = location.state;
    console.log(searchText);
    // const isFetchingMorePokemons = useSelector(isFetchingMorePokemonsSel, shallowEqual)
    const { pokemons, pokemon } = useSelector(pokemonInfoSel);
    const [search, setSearch] = useState(searchText);
    const [preview, setPreview] = useState({ name: "?????", faQuestion })
    useEffect(() => {
        if (pokemon.name) {
            setPreview(pokemon);
        }
    }, [pokemon])
    const handleClick = (prev) => {
        dispatch(fetchPokemon(prev.name));
    };
    return (<GridContainer>
        {search && <InputField gridArea={gridArea} setSearchText={setSearch} search={search} />}
        <Preview pokemon={preview} />

        <PokemonList>
            {!search ?
                pokemons.results?.map((pokemon, i) =>
                    <ListItem key={i} pokemon={pokemon} handleClick={() => handleClick(pokemon)} />) :
                pokemons.results?.filter(({ name, url }) =>
                    name.toLowerCase().includes(search.toLowerCase()) ||
                    url.slice(42, -1).startsWith(search))
                    .map((pokemon, i) =>
                        <ListItem key={i} pokemon={pokemon} handleClick={() => handleClick(pokemon)} />)
            }
        </PokemonList>
    </GridContainer>)
}

export default AllPokemon;
/* {pokemons.results &&  */
// hasNextPage={pokemons.next? true : false}
            // items={pokemons}
            // isFetchingMorePokemons={isFetchingMorePokemons}
            // loadNextPage={()=>dispatch(fetchMorePokemon(pokemons.next))}
            // handleClick={handleClick}