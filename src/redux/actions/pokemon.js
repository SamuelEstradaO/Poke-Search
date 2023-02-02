import { createAction } from "@reduxjs/toolkit";
import apiCall from "../api";
import axios from "axios";

export const startFetchingPokemon = createAction("START_FETCHING_POKEMON");
export const errorFetchingPokemon = createAction("ERROR_FETCHING_POKEMON");
export const successFetchingPokemon = createAction("SUCCESS_FETCHING_POKEMON");

export const startFetchingAllPokemon = createAction("START_FETCHING_All_POKEMON");
export const successFetchingAllPokemon = createAction("SUCCESS_FETCHING_ALL_POKEMON");

export const startFetchingMorePokemon = createAction("START_FETCHING_MORE_POKEMON");
export const successFetchingMorePokemon = createAction("SUCCESS_FETCHING_MORE_POKEMON");

let normalizeChain = (pokemon, evolutionChain = []) => {
    evolutionChain.push(pokemon.species);
    if (pokemon.evolves_to && !pokemon.evolves_to[0]) {
        return evolutionChain;
    }
    return normalizeChain(pokemon.evolves_to[0], evolutionChain);
}

export const fetchPokemon = name => async (dispatch) => {
    try {
        dispatch(startFetchingPokemon());
        const { data: speciesData } = await apiCall.get(`/pokemon-species/${name}`);
        const { data } = await apiCall.get(`/pokemon/${speciesData.id}`);
        data.speciesData = speciesData;
        let evolutionChain = [];
        if (speciesData.evolution_chain) {
            const { data: pokemonEvolutions } = await axios.get(speciesData.evolution_chain.url);
            console.log(pokemonEvolutions);
            evolutionChain = normalizeChain(pokemonEvolutions.chain);
            evolutionChain = evolutionChain.map((evolution) => {
                const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.url.slice(42, -1)}.png`
                return { ...evolution, sprite }
            })
        }
        dispatch(successFetchingPokemon({ data, evolutionChain }));
    } catch ({ response }) {
        dispatch(errorFetchingPokemon({ error: response.status }));
    }
}

export const fetchAllPokemon = (offset=0) => async (dispatch) => {
    try {
        dispatch(startFetchingAllPokemon());
        const { data } = await apiCall.get(`/pokemon-species?limit=10000`);
        dispatch(successFetchingAllPokemon({ data }));
    } catch ({ response }) {
        dispatch(errorFetchingPokemon({ error: response.status }));
    }
}

export const fetchMorePokemon = url => async (dispatch) => {
    try {
        dispatch(startFetchingMorePokemon());
        const { data } = await axios.get(url);
        dispatch(successFetchingMorePokemon({ data }));
    } catch (response) {
        dispatch(errorFetchingPokemon({ error: response.status }));
    }
}