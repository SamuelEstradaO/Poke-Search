import { forwardRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { pokemonsSel } from "../../../redux/selectors";

import optionsProvider from "../../components/optionsProvider";
import { useEffect } from "react";
import PokemonCard from "./PokemonCard";
import withImage from "../../components/withPokemonData";

// const Li = styled.li`
//     padding: 10px;
//     font-size: calc(${({ theme }) => theme.font.size.mobile.medium} * 0.8);
//     border-bottom: 1px solid #d4d4d4;
//     @media(min-width: 768px) {
//         font-size: calc(${({ theme }) => theme.font.size.desktop.medium} * 0.8);
//     }
//     &:hover {
//         background-color: rgba(1, 252, 231, 0.8);
//     }
//     & .selected{
//         background-color: rgba(1, 252, 231, 0.8);
//     }
// `
// const Item = styled(Link)`
//     text-decoration: none;
//     color: black;
// `
const Menu = styled.menu`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
    width: 90%;
    max-width: 1200px;
    justify-content: flex-start;
    row-gap: 1rem;
`

const List = ({ options, filteredOptions, handleChange, searchText }) => {
    useEffect(() => {
        handleChange(searchText);
    }, [searchText])
    return (<Menu>
        {searchText && searchText.length > 0 && options.map((option, i) => {

            return (<PokemonCard key={i} pokemon={option} />)
        })}
    </Menu>)
}



export default optionsProvider(List, pokemonsSel);