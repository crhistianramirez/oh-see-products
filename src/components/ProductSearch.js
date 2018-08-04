import React, { Component } from 'react';
import { TextField, MenuItem, Paper } from '../../node_modules/@material-ui/core';

function renderInput(inputProps) {
    const { ref, ...other } = inputProps;

    return (
        <TextField 
        fullWidth
        InputProps={{
            inputRef: ref,
            ...other
        }}
        />
    )
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ?
                    (<span key={String(index)} style={{fontWeight: 500}}>
                        {part.text}
                    </span>) :
                    <strong key={String(index)} style={{fontWeight: 300}}>
                        {part.text}
                    </strong>
                })}
            </div>
        </MenuItem>
    )
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    )
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

function getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
         const keep =
            count < 5 && suggestion.label.toLowerCase().slice(inputLength) === inputValue;

        if(keep) {
            count += 1;
        }

        return keep;
    })
}

class IntegrationAutoSuggest extends Component {
    state = {
        value: '',
        suggestions: []
    };

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value)
        })
    }

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }

    handleChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        })
    }

    render() {
        return (
            <Autosuggest>

            </Autosuggest>
        )
    }
}