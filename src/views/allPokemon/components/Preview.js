import styled from "styled-components";
import { FontAwesome, H2 as H2Base } from "../../../theme";

const Grid = styled.div`
    display: grid;
    grid-template-rows: 1fr 5fr;
    justify-items: center;
    height: 65%;
    position: relative;
    min-height: 250px;
`

const Img = styled.img`
    aspect-ratio: initial;
    height: 90%;
    height: : -webkit-fill-available;
    max-height: 400px;
`
const H2 = styled(H2Base)`
    margin: 0%;
`

const Preview = ({pokemon}) => {

    return(<Grid>
    <H2>{pokemon.species? `#${pokemon.species.url?.slice(42,-1)} ${pokemon.name}`: pokemon.name}</H2>
    {pokemon.sprites? <Img src={pokemon.sprites.front_default}/> : <FontAwesome icon={pokemon.faQuestion}/>}
    </Grid>)
}

export default Preview;