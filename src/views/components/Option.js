import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { H2 } from "../../theme";

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
`
const Icon = styled.span`
    aspect-ratio: 1/1;
    text-align: center;
    position: relative;
`
const Text = styled(H2)`
    padding-left: 10px; 
`
const FontAwesome = styled(FontAwesomeIcon)`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: calc(${({ theme }) => theme.font.size.mobile.large}*2.5);
    @media (min-width: 768px){
        font-size: calc(${({ theme }) => theme.font.size.desktop.large}*2.5);
    }
`

const Option = ({ option }) => {
    console.log(option);
    return (<OptionLink to={option.url}>
        <Icon><FontAwesome icon={option.icon} /></Icon>
        <Text >{option.text}</Text>
    </OptionLink>)
}

export default Option;
