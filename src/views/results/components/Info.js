import { useSelector, shallowEqual } from "react-redux";
import { pokemonInfoSel } from "../../../redux/selectors";

import Type from "./Type";

const Info = ({style}) => {
    const {pokemon} = useSelector(pokemonInfoSel, shallowEqual);
    return (<div style={style}>
        <h4>#Number: {pokemon.id}</h4>
        <h4>Type: {pokemon.types?.map( ({type}, i) =><Type key={i} type={type.name}/>)}</h4>
        <h4>Weight: {pokemon.weight/10>= 1? `${pokemon.weight/10} Kg` : `${pokemon.weight*100} gr`}.</h4>
        <h4>Height: {pokemon.height/10>= 1? `${pokemon.height/10} Mt` : `${pokemon.height*10} cm`}.</h4>
        <h4>Gender: </h4>

    </div>)
}

export default Info;
