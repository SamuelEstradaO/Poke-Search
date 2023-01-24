import { createAction } from "@reduxjs/toolkit";
import apiCall from "../api";
import axios from "axios";

export const startFetchingPokemon = createAction("START_FETCHING_POKEMON");
export const errorFetchingPokemon = createAction("ERROR_FETCHING_POKEMON");
export const successFetchingPokemon = createAction("SUCCESS_FETCHING_POKEMON");

export const fetchPokemon = name => async (dispatch) => {
    try {
        dispatch(startFetchingPokemon());
        const {data} = await apiCall.get(`/pokemon/${name}`);
        const {data: speciesData} = await axios.get(data.species.url);
        const { data: evolutionChain } = await axios.get(speciesData.evolution_chain.url);
        console.log(evolutionChain);
        dispatch(successFetchingPokemon({data,evolutionChain}));
    } catch ({response}) {
        dispatch(errorFetchingPokemon({error: response.status}));
    }
}