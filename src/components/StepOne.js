import React, { Component } from 'react';
import { ProductSearch } from './ProductSearch';

class StepOne extends Component {
    render() {
        console.log(this.props);
        debugger;
        return (
            <div>
                <ProductSearch 
                    value={this.props.value} 
                    suggestions={this.props.suggestions} 
                    onChange={state => {this.props.onChange(state)}}
                />
            </div>
        )
    }
    
  }
  export { StepOne };