import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { FontAwesome, H2 } from "../../theme";

const OptionLink = styled(Link)`
    text-decoration: none;
    color: black;
    border: 2px solid black;
    max-height: 125px;
    width: 100%;
    min-width: 150px;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    aspect-ratio: 4/1;
    border-radius: 1em;
    
    -webkit-text-stroke: 1px black;
    -webkit-text-fill-color: white;
    &:hover{
        background-color: rgba(1, 252, 231,0.8);
        transform: scale(1.1, 1.1);
    }
`
const Icon = styled.span`
    aspect-ratio: 1/1;
    text-align: center;
    position: relative;
`
const Text = styled(H2)`
    padding-left: 10px; 
`


const Option = ({ option }) => {
    return (<OptionLink to={option.url}>
        <Icon><FontAwesome icon={option.icon} /></Icon>
        <Text >{option.text}</Text>
    </OptionLink>)
}

export default Option;
