import { useSelector, shallowEqual } from "react-redux";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

import { pokemonInfoSel } from "../../../redux/selectors";
import { FontAwesome as FontAwesomeIcon } from "../../../theme";

import Type from "./Type";
import styled from "styled-components";

const Div = styled.div`
    grid-area: ${({ gridArea }) => gridArea};
    display: grid;
    grid-template-rows: auto;
    & div{
        display: flex;
        align-items: center;
    }
`
const Button = styled.button`
    aspect-ratio: 1/1;
    width: fit-content;
    padding: 1.5rem;
    position: relative;
    border: none;
    border-radius: 50%;
    margin-left: 1rem;
    background-color: ${({ gender }) => gender === "male" ? "#2b91e5" : "#e03884"};
    &:hover{
        cursor: pointer;
        transform: scale(1.2, 1.2);
        transition: transform 0.5s;
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
    return (<Div gridArea={gridArea}>
        <h4>No: {pokemon.id}</h4>
        <h4>Type: {pokemon.types?.map(({ type }, i) => <Type key={i} type={type.name} />)}</h4>
        <h4>Weight: {pokemon.weight / 10 >= 1 ? `${pokemon.weight / 10} Kg` : `${pokemon.weight * 100} gr`}.</h4>
        <h4>Height: {pokemon.height / 10 >= 1 ? `${pokemon.height / 10} Mt` : `${pokemon.height * 10} cm`}.</h4>
        <div>
            <h4>Gender:</h4>
            <Button gender="male" onClick={()=> setSprite(pokemon.sprites.front_default)}><FontAwesome icon={faMars} /></Button>
            <Button gender="female" onClick={()=> setSprite(pokemon.sprites.front_female? pokemon.sprites.front_female : pokemon.sprites.front_default)}><FontAwesome icon={faVenus}/></Button>
        </div>

    </Div>)
}

export default Info;
