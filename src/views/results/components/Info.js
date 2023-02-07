import { useSelector, shallowEqual } from "react-redux";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

import { pokemonInfoSel } from "../../../redux/selectors";
import { FontAwesome as FontAwesomeIcon, H4, P } from "../../../theme";

import Type from "./Type";
import styled from "styled-components";

const Div = styled.div`
    grid-area: ${({ gridArea }) => gridArea};
    display: grid;
    grid-template-rows: auto;
    white-space: break-spaces;
    text-align: center;
    justify-items: center;
    & div{
        display: flex;
        align-items: center;
        justify-content: center;
        @media (min-width: 768px){
            justify-content: normal;
        }
    }
    & p {
        max-width: 600px;
    }
    @media (min-width: 768px){
        text-align: start;
        justify-items: normal;
    }

`
const Button = styled.button`
    aspect-ratio: 1/1;
    width: fit-content;
    padding: 5vw;
    position: relative;
    border: none;
    border-radius: 25%;
    margin-left: 1rem;
    background-color: ${({ gender }) => gender === "male" ? "#2b91e5" : "#d73f62"};
    &:hover{
        cursor: pointer;
        transform: scale(1.2, 1.2);
        transition: transform 0.5s;
    }
    @media (min-width: 768px){
        padding: 1.5rem;
    }
`
const FontAwesome = styled(FontAwesomeIcon)`
    color: white;
    font-size: ${({ theme }) => theme.font.size.mobile.large};
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.medium};
    }
    @media (min-width: 1024px){
    font-size: ${({ theme }) => theme.font.size.desktop.large};
`

const Info = ({ gridArea, setSprite }) => {
    const { pokemon } = useSelector(pokemonInfoSel, shallowEqual);
    const {flavor_text: flavorText} = pokemon.speciesData.flavor_text_entries.find( ({ language }) => language.name === "en") || {};
    return (<Div gridArea={gridArea}>
        <P>{flavorText}</P>
        <H4>No: {pokemon.id}</H4>
        <H4>Type: {pokemon.types?.map(({ type }, i) => <Type key={i} type={type.name} />)}</H4>
        <H4>Weight: {pokemon.weight / 10 >= 1 ? `${pokemon.weight / 10} Kg` : `${pokemon.weight * 100} gr`}.</H4>
        <H4>Height: {pokemon.height / 10 >= 1 ? `${pokemon.height / 10} Mt` : `${pokemon.height * 10} cm`}.</H4>
        <div>
            <H4>Gender:</H4>
            <Button gender="male" onClick={()=> setSprite(pokemon.sprites.front_default)}><FontAwesome icon={faMars} /></Button>
            <Button gender="female" onClick={()=> setSprite(pokemon.sprites.front_female? pokemon.sprites.front_female : pokemon.sprites.front_default)}><FontAwesome icon={faVenus}/></Button>
        </div>

    </Div>)
}

export default Info;
