import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Header from "../components/Header";
import NotImplemented from "../views/NotImplemented";
import SearchPokemon from "../views/SearchPokemon";
import Results from "../views/results";
import ErrorComponent from "../components/ErrorComponent";

const Routes = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Header />} >
            <Route errorElement={<ErrorComponent />} />
            <Route index element={<SearchPokemon />} />
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