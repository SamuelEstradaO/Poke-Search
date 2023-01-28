import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    grid-template-rows: 1fr 4fr;
    height: 65%;
    border: 1px solid red;
`

const Preview = ({pokemon}) => {

    return(<Grid>
    {pokemon.name? pokemon.name : "none"}
    </Grid>)
}

export default Preview;