import styled from "styled-components";
import { H6 as H6Base } from "../../../theme";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
    position: relative;
    background-color: #e9b653;
    border: none;
    border-radius: 10px;
    width: 70%;
    padding: 1rem 0;
    display: flex;
    justify-content: space-around;
    @media( min-width: 768px){ 
        width: 100%;
    }
    @media( min-width: 1024px){ 
        width: 90%;
    }
    &:hover{
        cursor: pointer;
        transform: scale(1.05, 1.05);
        transition: transform 0.5s;
    }
    &:focus{
        background-color: #c91d19;
        transform: scale(1.05, 1.05);
        transition: transform 1s;
    }
    & div{
        background-color: white;
        border-radius: 5px;
        width: 90%;
        padding: 3% 0;
        @media (min-width: 768px){
            width: 75%;
            max-width: 300px;
        }
    }
    & img{
        display: none;
        @media (min-width: 768px){
            display: block;
        }
    }
`
export const H6 = styled(H6Base)`
    color: black;
    margin: auto;
    white-space: nowrap;
    text-align: left;
    padding-left: 0.5rem;
`

const ListItem = ({pokemon, handleClick}) => {
    const navigate = useNavigate();
    const handleDbClick = (e) => {
        if(e.detail >= 2) navigate(`/pokemon/${pokemon.url.slice(42, -1)}`);
    }
    return (<Button onFocus={handleClick} onClick={handleDbClick}><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="poke-ball"/>
        <div><H6>#{pokemon.url.slice(42, -1)} {pokemon.name}</H6></div>
        </Button>)    
}

export default ListItem;