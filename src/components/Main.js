import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepOne } from './StepOne';

// third party
import { OrderCloudSDK } from '../config/ordercloud';

function getSteps() {
  return [
    'Select a product',
    'Select a buyer user',
    'View results'
  ]
}

class Main extends Component {
  state = {
    activeStep: 0,
    stepOne: {
      value: '',
      suggestions: [],
      selectedProduct: {}
    },
  }
  getStepContent(step) {
    switch (step) {
      case 0:
        return <StepOne 
                  {...this.state.stepOne} 
                  onChange={(childState) => {
                    this.setState({stepOne: { ...this.state.stepOne, ...childState }})
                  }
                  }/>;
      case 1:
        return 'This is step two';
      case 2:
        return 'This is step three';
      default:
        return 'Unknown step';
    }
  }
  /**
   * this.setState(
   * { selected: { ...this.state.selected, name: 'barfoo' } }) which gets translated to this.setState({ selected: _extends({}, this.state.selected, { name: 'barfoo' }) });
   */
  logOut() {
    OrderCloudSDK.RemoveToken();
    this.props.history.push('/login');
  }
  goToNextStep(currentStep) {
    if(currentStep < getSteps().length - 1) {
      this.setState({activeStep: currentStep + 1})
    }
  }
  render() {
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <div>
        <AppBar position="static" style={{marginBottom: 20}}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{flexGrow: 1}}> 
              Product Visibility Tool
            </Typography>
            <Button color="inherit" onClick={() => {this.logOut()}}>Log Out</Button>
          </Toolbar>
        </AppBar>
        <div className="container">
          <Stepper activeStep={activeStep}>
            {steps.map(label => {
              return (
                <Step key={label} completed={false}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          <div className="step-content-container">
            {this.getStepContent(activeStep)}
          </div>
          <button onClick={() => this.goToNextStep(activeStep)}>Next Step</button>
        </div>
      </div>
    );
  }
}
export { Main };