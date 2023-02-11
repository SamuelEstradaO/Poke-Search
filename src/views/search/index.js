import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback, useMemo, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';

import { FontAwesome, H2 } from "../../theme";
import { pokemonInfoSel } from "../../redux/selectors";
import InputField from "./components/InputField";
import List from "./components/List";
import { HeaderContext } from "../../routes";

const Main = styled.main`
    width: 100vw;
    display: grid;
    grid-template-rows: auto;
    justify-items: center;
`
const Container = styled.div`
    position: sticky;
    top: ${({ header_height }) => header_height}px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin: auto;
    justify-content: center;
    align-content:center;
    background-color: white;
`
const SearchBar = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr;
    height: fit-content;
    max-width: 70%;
    @media(min-width: 768px){
        max-width: 600px;
    }
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
    max-width: 70%;
    @media(min-width: 768px){
        max-width: 600px;
    }
`

const FontAwesomeIcon = styled(FontAwesome)`
    font-size: calc(${({ theme }) => theme.font.size.mobile.large});
    @media (min-width: 768px){
        font-size: calc(${({ theme }) => theme.font.size.desktop.large}*1.5);
    }
`

const SearchPokemon = () => {
    const containerElement = useRef();
    const [searchText, setSearchText] = useState("")
    const { headerHeight } = useContext(HeaderContext);
    const { pokemons } = useSelector(pokemonInfoSel);
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
    console.log(headerHeight)
    // #${ option.url.slice(42, -1) } 
    return (<Main>
        <Container ref={containerElement} header_height={headerHeight}>
            <Text>Pokemon's name or No.</Text>
            <SearchBar>
                <InputField setSearchText={setSearchText} />
                <Button onClick={searchPokemon}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
            </SearchBar>
        </Container>
        <List searchText={searchText} />
    </Main>)
};



export default SearchPokemon;

// filterOptions: (options, state) => {
//     console.log(state);
//     let validOptions = state.inputValue !== "" ? options.filter(option => option.name ? option.name.toLowerCase().includes(state.inputValue.toLowerCase().replace(" ", "-")) :
//         option.url ? option.url.slice(42, -1).includes(state.inputValue) : false) : options;
//     return validOptions;
// },