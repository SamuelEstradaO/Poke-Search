import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';

import { FontAwesome, H2 } from "../../theme";
import { pokemonInfoSel } from "../../redux/selectors";
import ListItem from "./components/ListItem";
import { useRef } from "react";
import { useEffect } from "react";


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
    & div{
        position: relative;
        width: 100%;
    }
`
const Ul = styled.ul`
    list-style: none outside;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    height: fit-content;
    max-height: 20vh;
    border: 1px solid #d4d4d4;
    border-top: none;
    border-bottom: none;
    z-index: 99;
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

const Input = styled.input`
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 1rem 0 0 1rem;
    border: 2px solid black;
    font-size: ${({ theme }) => theme.font.size.mobile.medium};
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.medium};
    }
`
const FontAwesomeIcon = styled(FontAwesome)`
    font-size: calc(${({ theme }) => theme.font.size.mobile.large});
    @media (min-width: 768px){
        font-size: calc(${({ theme }) => theme.font.size.desktop.large}*1.5);
    }
`
const Li = styled.li`
    padding: 10px;
    font-size: calc(${({ theme }) => theme.font.size.mobile.medium} * 0.8);
    border-bottom: 1px solid #d4d4d4;
    @media(min-width: 768px) {
        font-size: calc(${({ theme }) => theme.font.size.desktop.medium} * 0.8);
    }
    &.Mui-focused, .Mui-focusVisible {
        background-color: rgba(1, 252, 231, 0.8);
    }
`
const SearchPokemon = () => {
    const { pokemons } = useSelector(pokemonInfoSel);
    const [searchText, setSearchText] = useState();
    const [hideOptions, setHideOptions] = useState(true);
    const [highlightedIndex, setHiglightedIndex] = useState(-1);
    const suggestedRef = useRef([]);
    const debouncedSetSearchText = useCallback(debounce(text => {
        setSearchText(text);
    }, 400), []);
    const navigate = useNavigate();
    const suggestedPokemons = useMemo(() => {
        let suggestions = []
        if (searchText) {
            suggestions = pokemons.results?.filter(({ name, url }) =>
                name.toLowerCase().startsWith(searchText.toLowerCase()) ||
                url.slice(42, -1).startsWith(searchText));
        }
        return suggestions;
    }, [searchText])
    const searchPokemon = () => {
        if (searchText) {
            let pokemon = searchText.toLowerCase()
            pokemon = pokemon.replace(" ", "-").replace(".", "");
            navigate(`../?search=${pokemon}`);
        }
    }

    const handleKeyDown = (e) => {
        switch (e.key) {
            case "Enter":
                searchPokemon();
                break;
            case "Escape":
                setHideOptions(true);
                break;
            case "ArrowDown":
                e.preventDefault();
                highlightedIndex === suggestedPokemons.length - 1 ? setHiglightedIndex(0) : setHiglightedIndex(highlightedIndex + 1);
                break;
            case "ArrowUp":
                e.preventDefault();
                highlightedIndex <= 0 ? setHiglightedIndex(suggestedPokemons.length - 1) : setHiglightedIndex(highlightedIndex - 1);
                break;
            default:
                break;
        }
    }
    const handleInputChange = (e, value) => {
        console.log(e)
        debouncedSetSearchText(value);
    };
    const handleBlur = () => {
        highlightedIndex < 0 && setHideOptions(true);
    }
    const handleFocus = () => searchText ? setHideOptions(false) : null;

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'use-autocomplete',
        options: pokemons.results,
        getOptionLabel: (option) => `${option.name && option.name.replace("-", " ")}`,
        onInputChange: handleInputChange,
        filterOptions: (options, state) => {
            console.log(state);
            let validOptions = state.inputValue !== "" ? options.filter(option =>
                (option.url && option.url.slice(42, -1).includes(state.inputValue)) ||
                (option.name && option.name.toLowerCase().includes(state.inputValue.toLowerCase().replace(" ", "-")))) : options;
            return validOptions;
        },
        freeSolo: true,
    });
    // #${ option.url.slice(42, -1) } 
    return (<Container>
        <Text>Pokemon's name or No.</Text>
        <SearchBar>
            <div {...getRootProps()}>
                <Input {...getInputProps()} autoFocus type="text" placeholder="e.g. 150 or Mewtwo" />
                {groupedOptions.length > 0 ?
                    <Ul {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                            <Li {...getOptionProps({ option, index })}>{`#${option.url.slice(42, -1)} ${option.name.replace("-", " ")}`}</Li>
                        ))}
                    </Ul> : null
                }
            </div>
            <Button onClick={searchPokemon}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
        </SearchBar>
    </Container>)
};

const debounce = (callback, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

export default SearchPokemon;

// filterOptions: (options, state) => {
//     console.log(state);
//     let validOptions = state.inputValue !== "" ? options.filter(option => option.name ? option.name.toLowerCase().includes(state.inputValue.toLowerCase().replace(" ", "-")) :
//         option.url ? option.url.slice(42, -1).includes(state.inputValue) : false) : options;
//     return validOptions;
// },