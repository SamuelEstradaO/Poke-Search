import { createSelector } from "@reduxjs/toolkit";

export const pokemonSel = state => state.pokemonReducer.pokemon;
export const pokemonEvolutionsSel = state => state.pokemonReducer.pokemonEvolution;
export const isFetchingPokemonSel = state => state.pokemonReducer.isFetchingPokemon;

export const pokemonInfoSel = createSelector(
    pokemonSel,
    pokemonEvolutionsSel,
    (pokemon, pokemonEvolutions) =>({
        pokemonEvolutions,
        pokemon
    })
)