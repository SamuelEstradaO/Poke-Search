import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Header from "../views/components/Header";
import NotImplemented from "../views/NotImplemented";
import SearchPokemon from "../views/SearchPokemon";
import Results from "../views/results";
import ErrorComponent from "../views/components/ErrorComponent";
import Index from "../views";
import AllPokemon from "../views/allPokemon";
import Random from "../views/components/Random";

const Routes = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Header />} >
            <Route errorElement={<ErrorComponent />} />
            <Route index element={<Index />} />
            <Route path="search" element={<SearchPokemon />}/>
            <Route path="all-pokemons" element={<AllPokemon />}/>
            <Route path="pokemon/random" element={<Random />}/>
            <Route path="pokemon/NotFound" element={<ErrorComponent />} />
            <Route path="pokemon/:pokemonName" element={<Results />} />
            <Route path="*" element={<NotImplemented />} />
        </Route>
    ), {basename: "/Poke-Search"})
    return (
        <RouterProvider router={router}/>
    )
}

export default Routes;