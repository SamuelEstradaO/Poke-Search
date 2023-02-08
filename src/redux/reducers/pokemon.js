import { createReducer } from "@reduxjs/toolkit";
import {
    startFetchingPokemon,
    successFetchingPokemon,
    errorFetchingPokemon,
    startFetchingAllPokemon,
    successFetchingAllPokemon,
    startFetchingMorePokemon,
    successFetchingMorePokemon,
} from "../actions/pokemon";

const initialState = {
    pokemon: {},
    pokemonEvolutions: [],
    error: undefined,
    isFetchingPokemon: false,
    isFetchingMorePokemon: false,
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
                pokemon: {},
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
        .addCase(startFetchingMorePokemon.toString(), (state, action) => {
            return {
                ...state,
                isFetchingMorePokemon: true,
                pokemon: {},
                pokemons: {},
                error: undefined
            }
        })
        .addCase(successFetchingMorePokemon.toString(), (state, action) => {
            return {
                ...state,
                isFetchingMorePokemon: false,
                pokemons: action.payload.data,
            }
        })
        .addDefaultCase((state, action) => {
            return state
        })
});

export default pokemonReducer;