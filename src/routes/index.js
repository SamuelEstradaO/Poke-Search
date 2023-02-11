import {
    createBrowserRouter,
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "../views/components/Header";
import NotImplemented from "../views/NotImplemented";
import SearchPokemon from "../views/search";
import Results from "../views/results";
import ErrorComponent from "../views/components/ErrorComponent";
import Index from "../views";
import AllPokemon from "../views/allPokemon";
import Random from "../views/components/Random";
import { fetchAllPokemon } from "../redux/actions/pokemon";
import { createContext, useState } from "react";

export const HeaderContext = createContext({})


const Routes = () => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const dispatch = useDispatch();
    const router = createHashRouter(createRoutesFromElements(
        <Route path="/" element={<Header />} >
            <Route errorElement={<ErrorComponent />} />
            <Route index element={<Index />} />
            <Route path="/pokemon" >
                <Route index element={<AllPokemon />} loader={() => {
                    dispatch(fetchAllPokemon());
                    return null;
                }} />

                <Route path="search" element={<SearchPokemon />} loader={() => {
                    dispatch(fetchAllPokemon());
                    return null;
                }} />
                <Route path="random" element={<Random />} />
                <Route path="NotFound" element={<ErrorComponent />} />
                <Route path=":pokemonName" element={<Results />} />
                <Route path="*" element={<NotImplemented />} />
            </Route>
        </Route>
    ))
    return (
        <HeaderContext.Provider value={{ headerHeight, setHeaderHeight }}>
            <RouterProvider router={router} />
        </HeaderContext.Provider >
    )
}

export default Routes;