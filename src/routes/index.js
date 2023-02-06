import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "../views/components/Header";
import NotImplemented from "../views/NotImplemented";
import SearchPokemon from "../views/SearchPokemon";
import Results from "../views/results";
import ErrorComponent from "../views/components/ErrorComponent";
import Index from "../views";
import AllPokemon from "../views/allPokemon";
import Random from "../views/components/Random";
import { fetchAllPokemon } from "../redux/actions/pokemon";

const Routes = () => {
    const dispatch = useDispatch();
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Header />} >
            <Route errorElement={<ErrorComponent />} />
            <Route index element={<Index />} />
            <Route path="/pokemon" >
                <Route index element={<AllPokemon />} loader={() => {
                    dispatch(fetchAllPokemon());
                    return null;
                }} />
                <Route path="search" element={<SearchPokemon />} />
                <Route path="random" element={<Random />} />
                <Route path="NotFound" element={<ErrorComponent />} />
                <Route path=":pokemonName" element={<Results />} />
                <Route path="*" element={<NotImplemented />} />
            </Route>
        </Route>
    ), { basename: "/Poke-Search" })
    return (
        <RouterProvider router={router} />
    )
}

export default Routes;