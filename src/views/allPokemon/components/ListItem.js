import styled from "styled-components";
import { H6 as H6Base } from "../../../theme";

const Button = styled.button`
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
        border: 1px solid red;
        cursor: pointer;
    }
    &:focus{
        background-color: #c91d19;
        transform: scale(1.05, 1.05);
        
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
    return (<Button onFocus={handleClick}><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="poke-ball"/>
        <div><H6>#{pokemon.url.slice(42, -1)} {pokemon.name}</H6></div>
        </Button>)    
}

export default ListItem;