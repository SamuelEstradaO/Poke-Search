import styled from "styled-components";
import { faMagnifyingGlass, faQuestion, faGamepad } from "@fortawesome/free-solid-svg-icons";

import Option from "./components/Option";

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    justify-content: center;
    justify-items: center;
    height: 100vh;
    width: 100%;
    row-gap: 5vh;
    padding: 10%;
`

const options = [
    {
        icon: faGamepad,
        text: "Show all pokemons",
        url: "/all-pokemons"
    },
    {
        icon: faMagnifyingGlass,
        text: "Search pokemon",
        url: "/search"
    },
    {
        icon: faQuestion,
        text: "Show random pokemon",
        url: "random-pokemon"
    },
];

const Index = () => {

    return(<Container>
        {options.map((option, i) => <Option key={i} option={option}/>)}
    </Container>)
}

export default Index;