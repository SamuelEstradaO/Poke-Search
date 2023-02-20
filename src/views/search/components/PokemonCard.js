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
    flex-basis: 100%;
    @media(min-width: 470px){
        flex-basis: 50%;
    }
    @media(min-width: 768px){
        flex-basis: 25%;
    }
`
const Li = styled.li`
    background-color: rgba(227, 195, 67, 0.7);
    list-style: none;
    width: 95%;
    border: 1px solid gray;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    height: 350px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: background-color 0.25s ease-out;
    &:hover{
        background-color: rgba(227, 195, 67, 1);
        transition: background-color 0.25s ease-out;
        transform: scale(1.05, 1.05);
        transition: transform 0.25s;
    }
`
const Figure = styled.figure`
    border: 1px solid gray;
    width: 95%;
    text-align: center;
    margin: 0;
    padding-top: 2%; 
    background-color: #f8f8ff;
    white-space: nowrap;
`
const FigCaption = styled.figcaption`
    text-overflow: ellipsis;
    overflow: hidden;
`
const H6 = styled(H6Base)`
    margin: 0;
    color: black;
    font-size:80%;
    white-space: ;
`
const Div = styled.div`
    background-color: #f8f8ff;
    display: grid;
    padding: 10px;
    width: 95%;
    grid-template-rows: 10% 70% 20%;
    border: 1px solid gray;
    overflow-wrap: anywhere;
    height: 200px;
    font-size: ${({ theme }) => theme.font.size.mobile.small};
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.small};
    }
    & .flavor-text{
        display: block;
        overflow: auto;
        @media(min-width: 768px){
            display: block;
        }
    }
`
const Span = styled.span`
    text-align: center;
    font-size: 90%;

`

const PokemonCard = ({ pokemon, data = {}, loading }) => {
    const { flavor_text: flavorText } = Object.hasOwn(data, "speciesData") ? data.speciesData.flavor_text_entries.find(({ language }) => language.name === "en") || {} : {};
    return (
        <Card to={`/pokemon/${pokemon.url.slice(42, -1)}`}>
            <Li>
                {!loading && data &&
                    <>
                        <Figure>
                            <FigCaption><H6>{pokemon.name.replace("-", " ")}</H6></FigCaption>
                            <img src={data.sprites.front_default} alt={pokemon.name} />
                        </Figure>
                        <Div>
                            <H6>No: {pokemon.url.slice(42, -1)}</H6>
                            {flavorText && <H6 className="flavor-text">{flavorText}</H6>}
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