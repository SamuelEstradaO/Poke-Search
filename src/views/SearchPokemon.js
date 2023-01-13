import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPokemon = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const searchPokemon = () => {
        navigate(`/pokemon/${searchText}`);
    }
    const handleKeyDown = e => {
        if (e.key === "Enter")
            searchPokemon()
    }
    return(<div>
        <input type="text" placeholder="Introduce name" onChange={({target: {value}})=> setSearchText(value)} onKeyDown={handleKeyDown}/>
        <button onClick={searchPokemon}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
    </div>)
}; 

export default SearchPokemon;