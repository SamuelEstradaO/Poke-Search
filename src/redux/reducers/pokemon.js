import { createReducer } from "@reduxjs/toolkit";
import {
    startFetchingPokemon,
    successFetchingPokemon,
    errorFetchingPokemon
} from "../actions/pokemon"

const initialState = {
    pokemon: {},
    pokemonEvolutions: {},
    errorPokemon: undefined,
    isFetchingPokemon: false
};

const pokemonReducer = createReducer(initialState, builder => {
    builder
        .addCase(startFetchingPokemon.toString(), (state, action) => {
            return {
                ...state,
                errorPokemon: undefined,
                isFetchingPokemon: true,
            }
        })
        .addCase(successFetchingPokemon.toString(), (state, action) => {
            return {
                ...state,
                isFetchingPokemon: false,
                pokemon: action.payload.data,
                pokemonEvolutions: action.payload.evolutionChain,
            }
        })
        .addCase(errorFetchingPokemon.toString(), (state, action) => {
            return {
                ...state,
                errorPokemon: action.payload.error,
                isFetchingPokemon: false,
            }
        })
        .addDefaultCase((state, action)=> {
            return state
        })
});

export default pokemonReducer;