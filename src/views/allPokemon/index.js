import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllPokemon } from "../../redux/actions/pokemon";

const AllPokemon = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchAllPokemon());
    },[])
    return (<>
    
    </>)
}

export default AllPokemon;