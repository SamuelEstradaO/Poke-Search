import styled from "styled-components";
import { FontAwesome, H2 } from "../../../theme";

const Grid = styled.div`
    display: grid;
    grid-template-rows: 1fr 4fr;
    justify-items: center;
    height: 65%;
    border: 1px solid red;
    position: relative;
`

const Img = styled.img`

`

const Preview = ({pokemon}) => {

    return(<Grid>
    <H2>{pokemon.species? `#${pokemon.species.url?.slice(42,-1)} ${pokemon.name}`: pokemon.name}</H2>
    {pokemon.sprites? <Img src={pokemon.sprites.front_default}/> : <FontAwesome icon={pokemon.faQuestion}/>}
    </Grid>)
}

export default Preview;