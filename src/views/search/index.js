import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';

import { FontAwesome, H2 } from "../../theme";
import { pokemonInfoSel } from "../../redux/selectors";
import InputField from "./components/InputField";


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 90vh;
    margin: auto;
    max-width: 70%;
    justify-content: center;
    align-content:center;
    @media(min-width: 768px){
        max-width: 600px;
    }
`
const SearchBar = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr;
    height: fit-content;
    width: 100%;
`

const Button = styled.button`
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 0 1rem  1rem 0;
    background-color: transparent;
    border: 2px solid black;
    position: relative;
    &:hover{
        background-color: rgba(1, 252, 231,0.8);
        cursor: pointer;
    }
`
const Text = styled(H2)`
    height: fit-content;
    width: 100%;
`

const FontAwesomeIcon = styled(FontAwesome)`
    font-size: calc(${({ theme }) => theme.font.size.mobile.large});
    @media (min-width: 768px){
        font-size: calc(${({ theme }) => theme.font.size.desktop.large}*1.5);
    }
`

const SearchPokemon = () => {
    const [searchText, setSearchText] = useState();
    const navigate = useNavigate();
    const searchPokemon = () => {
        if (searchText) {
            let pokemon = searchText.toLowerCase()
            pokemon = pokemon.replace(" ", "-").replace(".", "");
            (navigate(`../`, { state: pokemon }))
        }
    }

    const handleKeyDown = (e) => {
        switch (e.key) {
            case "Enter":
                searchPokemon();
                break;
            default:
                break;
        }
    }


    // #${ option.url.slice(42, -1) } 
    return (<Container>
        <Text>Pokemon's name or No.</Text>
        <SearchBar>
            <InputField setSearchText={setSearchText} />
            <Button onClick={searchPokemon}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
        </SearchBar>
    </Container>)
};



export default SearchPokemon;

// filterOptions: (options, state) => {
//     console.log(state);
//     let validOptions = state.inputValue !== "" ? options.filter(option => option.name ? option.name.toLowerCase().includes(state.inputValue.toLowerCase().replace(" ", "-")) :
//         option.url ? option.url.slice(42, -1).includes(state.inputValue) : false) : options;
//     return validOptions;
// },