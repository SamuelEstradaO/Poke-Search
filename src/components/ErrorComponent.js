import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { errorFetchingPokemonSel, isFetchingPokemonSel } from "../redux/selectors";

const ErrorComponent = () => {
    const errorFetchingPokemon = useSelector(errorFetchingPokemonSel, shallowEqual);
    const isFetchingPokemon = useSelector(isFetchingPokemonSel, shallowEqual);
    
    return (<>
        {!isFetchingPokemon && <p>
                Not info found
                Response {errorFetchingPokemon}
            </p>}
    </>)
}

export default ErrorComponent;