import styled from "styled-components";

const P = styled.p`
    display: inline-block;
    background-color: ${({theme:{types},pokeType})=> types[pokeType].dark};
    background-image: linear-gradient(${({pokeType, theme:{types}})=> types[pokeType].light} 0 5%,${({pokeType, theme:{types}})=> types[pokeType].dark} 40% 60%,${({pokeType, theme:{types}})=> types[pokeType].light} 95% 100%);
    border-radius: 6px;
    padding: 3px 6px;
    margin: 0 1px;
    -webkit-text-stroke: 1px black;
    -webkit-text-fill-color: white;
`

const Type = ({type}) =>{
    const capType = type.charAt(0).toUpperCase() + type.slice(1);
    return (<P pokeType={type}>
        {capType}
    </P>)
}

export default Type;