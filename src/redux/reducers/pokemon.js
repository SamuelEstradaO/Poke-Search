import { createReducer } from "@reduxjs/toolkit";
import {
    startFetchingPokemon,
    successFetchingPokemon,
    errorFetchingPokemon,
    startFetchingAllPokemon,
    successFetchingAllPokemon,
} from "../actions/pokemon"

const initialState = {
    pokemon: {},
    pokemonEvolutions: [],
    error: undefined,
    isFetchingPokemon: false,
    isFetchingEvolution: false,
    pokemons: {}
};

const pokemonReducer = createReducer(initialState, builder => {
    builder
        .addCase(startFetchingPokemon.toString(), (state, action) => {
            return {
                ...state,
                isFetchingPokemon: true,
                pokemon: {},
                pokemonEvolutions: [],
                error: undefined
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
                error: action.payload.error,
                isFetchingPokemon: false,
            }
        })
        .addCase(startFetchingAllPokemon.toString(), (state, action) => {
            return {
                ...state,
                isFetchingPokemon: true,
                pokemons: {},
                error: undefined
            }
        })
        .addCase(successFetchingAllPokemon.toString(), (state, action) => {
            return {
                ...state,
                isFetchingPokemon: false,
                pokemons: action.payload.data,
            }
        })
        .addDefaultCase((state, action)=> {
            return state
        })
});

export default pokemonReducer;