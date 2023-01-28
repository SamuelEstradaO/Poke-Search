import styled from "styled-components";

const Button = styled.button`
    background-color: #e9b653;
    border: none;
    border-radius: 10px;
    padding: 1rem 0;
    width: 80%;
    & span{
        font-size: ${({ theme }) => theme.font.size.mobile.small};
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.small};
    }
        background-color: white;
        padding: 10px; 
        border-radius: 5px;
        width: 60%;
    }
`

const ListItem = ({pokemon, onClick}) => {
    return (<Button onClick={onClick}>
        <span>#{pokemon.url.slice(42, -1)} {pokemon.name}</span>
        </Button>)    
}

export default ListItem;