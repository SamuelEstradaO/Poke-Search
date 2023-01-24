import { Outlet, Link } from "react-router-dom";
const Header = () => {
    return (<>
        <header>
            <Link to={"/"} replace={false}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="pokeball"/>
            <h1>Poke-search</h1>
            </Link>
            
        </header>
        <Outlet />
        </>)
}

export default Header;