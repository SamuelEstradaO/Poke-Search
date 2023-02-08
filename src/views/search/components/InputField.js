import { useSelector } from "react-redux";
import { pokemonInfoSel } from "../../../redux/selectors";
import { useAutocomplete } from "@mui/base";
import { useCallback } from "react";
import styled from "styled-components";

const Ul = styled.ul`
    list-style: none outside;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    height: fit-content;
    max-height: 20vh;
    border: 1px solid #d4d4d4;
    border-top: none;
    border-bottom: none;
    background-color: white;
    z-index: 1; 
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 1rem 0 0 1rem;
    border: 2px solid black;
    font-size: ${({ theme }) => theme.font.size.mobile.medium};
    @media (min-width: 768px){
        font-size: ${({ theme }) => theme.font.size.desktop.medium};
    }
`

const Div = styled.div`
    position: relative;
    width: ${({ gridArea }) => gridArea.mobile ? "60%" : "100%"};
    ${({ gridArea }) => gridArea.mobile ? gridArea.mobile : ""}
    ${({ gridArea }) => gridArea.mobile ? "justify-self: center;" : ""}
    @media(min-width: 768px){
        ${({ gridArea }) => gridArea.desktop ? gridArea.desktop : ""}
    }
`

const Li = styled.li`
    padding: 10px;
    font-size: calc(${({ theme }) => theme.font.size.mobile.medium} * 0.8);
    border-bottom: 1px solid #d4d4d4;
    @media(min-width: 768px) {
        font-size: calc(${({ theme }) => theme.font.size.desktop.medium} * 0.8);
    }
    &.Mui-focused, .Mui-focusVisible {
        background-color: rgba(1, 252, 231, 0.8);
    }
`

const InputField = ({ setSearchText, gridArea = false }, search = "") => {
    const { pokemons } = useSelector(pokemonInfoSel);
    const debouncedSetSearchText = useCallback(debounce(text => {
        setSearchText(text);
    }, 400), []);
    const handleInputChange = (e, value) => {
        debouncedSetSearchText(value);
    };
    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'use-autocomplete',
        options: pokemons.results,
        getOptionLabel: (option) => Object.hasOwn(option, "name") ? `${option.name && option.name.replace("-", " ")}` : option,
        onInputChange: handleInputChange,
        filterOptions: (options, state) => {
            let suggestedOptions = state.inputValue !== "" ? options.filter(option =>
                (option.url && option.url.slice(42, -1).includes(state.inputValue)) ||
                (option.name && option.name.toLowerCase().includes(state.inputValue.toLowerCase().replace(" ", "-")))) : options;
            return suggestedOptions;
        },
        freeSolo: true,
    });
    return (<Div {...getRootProps()} gridArea={gridArea}>
        <Input {...getInputProps()} autoFocus type="text" placeholder="e.g. 150 or Mewtwo" />
        {groupedOptions.length > 0 ?
            <Ul {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                    <Li {...getOptionProps({ option, index })}>{`#${option.url.slice(42, -1)} ${option.name.replace("-", " ")}`}</Li>
                ))}
            </Ul> : null
        }
    </Div>)
}

export const debounce = (callback, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

export default InputField;