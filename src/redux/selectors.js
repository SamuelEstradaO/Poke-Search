import { createSelector } from "@reduxjs/toolkit";

export const pokemonSel = state => state.pokemonReducer.pokemon;
export const pokemonEvolutionsSel = state => state.pokemonReducer.pokemonEvolutions;
export const isFetchingPokemonSel = state => state.pokemonReducer.isFetchingPokemon;
export const errorFetchingPokemonSel = state => state.pokemonReducer.error;

export const isFetchingEvolutionSel = state => state.pokemonReducer.isFetchingEvolution;

export const pokemonInfoSel = createSelector(
    pokemonSel,
    pokemonEvolutionsSel,
    (pokemon, pokemonEvolutions) =>({
        pokemonEvolutions,
        pokemon
    })
)