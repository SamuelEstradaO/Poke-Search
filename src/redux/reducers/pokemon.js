import { createReducer } from "@reduxjs/toolkit";
import {
    startFetchingPokemon,
    successFetchingPokemon,
    errorFetchingPokemon
} from "../actions/pokemon"

const initialState = {
    pokemon: {},
    pokemonEvolutions: {},
    error: undefined,
    isFetchingPokemon: false
};

const pokemonReducer = createReducer(initialState, builder => {
    builder
        .addCase(startFetchingPokemon.toString(), (state, action) => {
            return {
                ...state,
                isFetchingPokemon: true,
                pokemon: {},
                pokemonEvolutions: {},
                error: undefined
            }
        })
        .addCase(successFetchingPokemon.toString(), (state, {payload: {data, evolutionChain}}) => {
            data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
            return {
                ...state,
                isFetchingPokemon: false,
                pokemon: data,
                pokemonEvolutions: evolutionChain,
            }
        })
        .addCase(errorFetchingPokemon.toString(), (state, action) => {
            return {
                ...state,
                error: action.payload.error,
                isFetchingPokemon: false,
            }
        })
        .addDefaultCase((state, action)=> {
            return state
        })
});

export default pokemonReducer;