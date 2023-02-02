import styled from "styled-components"
import { H6 } from "./ListItem" 

const Div = styled.div`
    background-color: #e9b653;
    border: none;
    border-radius: 10px;
    width: 60%;
    padding: 1rem 0;
    display: flex;
    justify-content: space-around;
    @media( min-width: 768px){ 
        width: 100%;
    }
    @media( min-width: 1024px){ 
        width: 90%;
    }
    & div{
        background-color: white;
        border-radius: 5px;
        width: 90%;
        padding: 3% 0;
        @media (min-width: 768px){
            width: 70%;
            max-width: 210px;
        }
    }
    & img{
        display: none;
        @media (min-width: 768px){
            display: block;
        }
    }
`

const Loader = () => {

    return (<Div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="poke-ball"/>
        <div><H6>Loading...</H6></div>
        </Div>)
}
export default Loader;