import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesome, H2 } from "../theme";

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
    }
`
const Text = styled(H2)`
    height: fit-content;
    width: 100%;
`

const Input = styled.input`
    width: 100%;
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
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const searchPokemon = () => {
        if (searchText) {
            let pokemon = searchText.toLowerCase()
            pokemon = pokemon.replace(" ", "-").replace(".", "");
            navigate(`../pokemon/${pokemon}`);
        }
    }
    const handleKeyDown = e => {
        if (e.key === "Enter")
            searchPokemon();
    }

    return (<Container>
        <Text>Pokemon's name or No.</Text>
        <SearchBar>
            <Input type="text" placeholder="e.g. 150 or Mewtwo" onChange={({ target: { value } }) => setSearchText(value)} onKeyDown={handleKeyDown} />
            <Button onClick={searchPokemon}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
        </SearchBar>
    </Container>)
};

export default SearchPokemon;