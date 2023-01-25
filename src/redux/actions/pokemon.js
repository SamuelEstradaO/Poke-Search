import { createAction } from "@reduxjs/toolkit";
import apiCall from "../api";
import axios from "axios";

export const startFetchingPokemon = createAction("START_FETCHING_POKEMON");
export const errorFetchingPokemon = createAction("ERROR_FETCHING_POKEMON");
export const successFetchingPokemon = createAction("SUCCESS_FETCHING_POKEMON");

let normalizeChain = (pokemon, evolutionChain = []) => {
    evolutionChain.push(pokemon.species);
    if (pokemon.evolves_to && !pokemon.evolves_to[0]){
        console.log(evolutionChain);
        return evolutionChain;
    }
    return normalizeChain(pokemon.evolves_to[0], evolutionChain);
}

export const fetchPokemon = name => async (dispatch) => {
    try {
        dispatch(startFetchingPokemon());
        const {data} = await apiCall.get(`/pokemon/${name}`);
        const {data: speciesData} = await axios.get(data.species.url);
        const { data: pokemonEvolutions } = await axios.get(speciesData.evolution_chain.url);
        let evolutionChain = normalizeChain(pokemonEvolutions.chain);
        evolutionChain = evolutionChain.map( (evolution) => {
            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.url.slice(42,-1)}.png`
            return {...evolution, sprite}
        })
        dispatch(successFetchingPokemon({data,evolutionChain}));
    } catch ({response}) {
        dispatch(errorFetchingPokemon({error: response.status}));
    }
}