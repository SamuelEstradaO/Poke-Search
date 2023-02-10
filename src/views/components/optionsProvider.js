import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const optionsProvider = (WrappedComponent, optionsSelector) => {
    return props => {
        const { results = [] } = useSelector(optionsSelector);
        const [options, setOptions] = useState(results);
        const [inputValue, setInputValue] = useState("");
        useEffect(() => {
            inputValue && filteredOptions(inputValue);
        }, [inputValue])
        const handleChange = (searchText) => {

            setInputValue(searchText);
        }
        const filteredOptions = (searchText) => {
            let options;
            options = !searchText ? results : results.filter(({ name = "", url = "" }) =>
                name.toLowerCase().includes(searchText.toLowerCase().replace(" ", "-")) ||
                url.slice(42, -1).includes(searchText)
            );
            setOptions(options);
        }
        return (
            <WrappedComponent {...props} options={options} filteredOptions={filteredOptions} handleChange={handleChange} />
        )
    }
}

export default optionsProvider;