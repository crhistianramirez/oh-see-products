import AutoSuggest from 'react-autosuggest';
import React, { Component } from 'react';
import { OrderCloudSDK } from '../config/ordercloud';
import { debounce as _debounce } from 'lodash';

const getSuggestionValue = suggestion => suggestion.ID;
const renderSuggestion = suggestion => (
    <span>
        <strong>{suggestion.Name}</strong><br/>
        <small>{suggestion.ID}</small>
    </span>
)

class ProductSearch extends Component {
    constructor() {
        super();
        this.debouncedLoadSuggestions = _debounce(this.loadSuggestions, 150); 
    }
    onChange = (event, { newValue }) => {
        this.props.onChange({value: newValue});
    }
    loadSuggestions = value => {
        return OrderCloudSDK.Products.List({search: value, pageSize: 6})
            .then(productList => {
                this.props.onChange({
                    suggestions: productList.Items
                })
            })
    }
    onSuggestionsFetchRequested = ({value}) => {
        this.debouncedLoadSuggestions(value);
    }
    onSuggestionsClearRequested = () => {
        this.props.onChange({
            suggestions: []}
        )
    }
    onSuggestionSelected(event, { suggestion }) {
        this.props.onChange({
            selectedProduct: suggestion
        })
    }

    render() {
        const { value, suggestions } = this.props;
        const inputProps = {
            placeholder: 'Search a product',
            value,
            onChange: this.onChange
        };

        return (
            <AutoSuggest 
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                highlightFirstSuggestion={true}
            />
        )
    }
}
export { ProductSearch }