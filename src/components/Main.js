import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import '../styles/layout.css';

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
    activeStep: 0
  }
  logOut() {
    OrderCloudSDK.RemoveToken();
    this.props.history.push('/login');
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
          Active Step: {activeStep}
        </div>
      </div>
    );
  }
}
export { Main };