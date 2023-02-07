import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { FontAwesome, H2 } from "../../theme";
import { pokemonInfoSel } from "../../redux/selectors";
import ListItem from "./components/ListItem";

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
    height: 20vh;
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

const SearchPokemon = () => {
    const { pokemons } = useSelector(pokemonInfoSel);
    const [searchText, setSearchText] = useState();
    const debouncedSetSearchText = useCallback(debounce(text => setSearchText(text), 400), []);
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
    const handleKeyDown = e => {
        if (e.key === "Enter")
            searchPokemon();
    }
    const handleInputChange = e => debouncedSetSearchText(e.target.value);
    console.log(suggestedPokemons, searchText);
    return (<Container>
        <Text>Pokemon's name or No.</Text>
        <SearchBar>
            <div>
                <Input autoFocus type="text" placeholder="e.g. 150 or Mewtwo" onChange={handleInputChange} onKeyDown={handleKeyDown} />
                {suggestedPokemons && suggestedPokemons.length > 0 &&
                    <Ul>
                        {suggestedPokemons.map((item, i) =>
                            <ListItem item={item} key={i} />
                        )}
                    </Ul>}
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