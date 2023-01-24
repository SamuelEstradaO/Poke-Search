import styled from "styled-components";

const P = styled.p`
    display: inline-block;
    background-color: ${({theme,pokeType})=> theme[pokeType].dark};
    background-image: linear-gradient(${({pokeType, theme})=> theme[pokeType].light},${({pokeType, theme})=> theme[pokeType].dark} 50%,${({pokeType, theme})=> theme[pokeType].light});
    border-radius: 6px;
    padding: 3px 6px;
    margin: 0 1px;
    -webkit-text-stroke: 1px black;
    -webkit-text-fill-color: white;
`

const Type = ({type}) =>{
    return (<P pokeType={type}>
        {type}
    </P>)
}

export default Type;