import { useSelector, shallowEqual } from "react-redux";
import { pokemonInfoSel } from "../../../redux/selectors";

import Type from "./Type";
import styled from "styled-components";

const Div = styled.div`
    grid-area: ${({gridArea}) => gridArea};
`

const Info = ({gridArea}) => {
    const {pokemon} = useSelector(pokemonInfoSel, shallowEqual);
    return (<Div gridArea={gridArea}>
        <h4>No: {pokemon.id}</h4>
        <h4>Type: {pokemon.types?.map( ({type}, i) =><Type key={i} type={type.name}/>)}</h4>
        <h4>Weight: {pokemon.weight/10>= 1? `${pokemon.weight/10} Kg` : `${pokemon.weight*100} gr`}.</h4>
        <h4>Height: {pokemon.height/10>= 1? `${pokemon.height/10} Mt` : `${pokemon.height*10} cm`}.</h4>
        <h4>Gender: </h4>

    </Div>)
}

export default Info;
