import { createSelector } from "@reduxjs/toolkit";

export const pokemonSel = state => state.pokemonReducer.pokemon;
export const pokemonEvolutionsSel = state => state.pokemonReducer.pokemonEvolutions;
export const isFetchingPokemonSel = state => state.pokemonReducer.isFetchingPokemon;
export const errorFetchingPokemonSel = state => state.pokemonReducer.error;
export const pokemonsSel = state => state.pokemonReducer.pokemons;

export const isFetchingEvolutionSel = state => state.pokemonReducer.isFetchingEvolution;
export const isFetchingMorePokemonsSel = state => state.pokemonReducer.isFetchingMorePokemons;

export const pokemonInfoSel = createSelector(
    pokemonSel,
    pokemonEvolutionsSel,
    pokemonsSel,
    (pokemon, pokemonEvolutions, pokemons) =>({
        pokemonEvolutions,
        pokemon,
        pokemons
    })
)