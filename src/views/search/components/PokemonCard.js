import { Link } from "react-router-dom";
import styled from "styled-components";
import apiCall from "../../../redux/api";
import withPokemonData from "../../components/withPokemonData";
import { H6 as H6Base } from "../../../theme";
import Type from "../../results/components/Type";

const Card = styled(Link)`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    text-decoration: none;
    color: black;
    flex-basis: 50%;
    @media(min-width: 768px){
        flex-basis: 25%;
    }
`
const Li = styled.li`
    list-style: none;
    width: 95%;
    border: 1px solid red;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    height: 350px;
`
const H6 = styled(H6Base)`
    margin: 0;
    color: black;
`
const Div = styled.div`
    display: grid;
    width: 95%;
    grid-template-rows: auto;
    border: 1px solid gray;
    
    height: 200px;
    font-size: ${({ theme }) => theme.font.size.mobile.small};
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.small};
    }
`
const Span = styled.span`
    text-align: center;
    font-size: inherit;
`
const PokemonCard = ({ pokemon, data = {}, loading }) => {
    const { flavor_text: flavorText } = Object.hasOwn(data, "speciesData") ? data.speciesData.flavor_text_entries.find(({ language }) => language.name === "en") || {} : {};
    return (
        <Card to={`/pokemon/${pokemon.url.slice(42, -1)}`}>
            <Li>
                {!loading && data &&
                    <>
                        <figure>
                            <figcaption><H6>{pokemon.name}</H6></figcaption>
                            <img src={data.sprites.front_default} alt={pokemon.name} />
                        </figure>
                        <Div>
                            <H6>No: {pokemon.url.slice(42, -1)}</H6>
                            {flavorText && <H6>{flavorText}</H6>}
                            <Span>{data.types.map(({ type }, i) => <Type key={i} type={type.name} />)}</Span>
                        </Div>
                    </>}
            </Li>
        </Card>
    );
}

const fetchData = async (pokemon) => {
    try {
        const { data: speciesData } = await apiCall.get(`/pokemon-species/${pokemon.url.slice(42, -1)}`);
        const { data } = await apiCall.get(`/pokemon/${pokemon.url.slice(42, -1)}`);
        data.speciesData = speciesData;
        return data;
    } catch {
        const data = {
            sprites:
                { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" }
        }
        return data;
    }
}

export default withPokemonData(PokemonCard, fetchData);