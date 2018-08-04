import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DefaultErrorHandler from '../config/error-handler';

// third party
import VisibilityIcon from '@material-ui/icons/Visibility';
import { OrderCloudSDK } from '../config/ordercloud';
import { ToastContainer, toast } from 'react-toastify';
import * as jwtDecode from 'jwt-decode';

const CardTitle = () => {
  return (
    <div>
      Oh See Products <VisibilityIcon />
    </div>
  )
}

const requiredRoles = ['ProductAdmin'];

const getMissingRequiredRoles = token => {
  if(!token) {return false};

  const missingRoles = [];
  const decodedToken = jwtDecode(token);
  if(typeof decodedToken.role === 'string') {
      requiredRoles.forEach(required => {
          if(required !== decodedToken.role) {
              missingRoles.push(required);
          }
      })
  } else {
      requiredRoles.forEach(required => {
          if(decodedToken.role.indexOf(required) < 0) {
              missingRoles.push(required);
          }
      })
  }
  return missingRoles;
}

class Login extends Component {
  state = {
    clientid: '',
    username: '',
    password: ''
  };
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = e => {
    e.preventDefault();
    return OrderCloudSDK.Auth.Login(
      this.state.username,
      this.state.password,
      this.state.clientid,
      requiredRoles
    ).then(authResponse => {
      OrderCloudSDK.SetToken(authResponse.access_token);

      // verify user has minimum required roles
      const missingRoles = getMissingRequiredRoles(authResponse.access_token);
      if(missingRoles.length) {
        return toast.error(`Missing required Roles: ${missingRoles.join(' ')}`)
      }

      // redirect to main
      this.props.history.push('/');
    })
    .catch(e => DefaultErrorHandler(e));
  }
  render() {
    return (
      <div className="loginContainer">
        <div className="accent-stripe" style={{height: 250, width: '125%', position: 'absolute', backgroundColor: '#03a9f4', zIndex: -5, margin: -100}}></div>
        <Card className="loginPaper" elevation={1}>
          <CardHeader title={<CardTitle />} subheader="The OrderCloud Products Visibility tool helps you determine why a product is or isn't visible" />
          <CardContent>
            <form name="loginForm" onSubmit={e => this.onSubmit(e)}>
              <TextField
                name="clientid"
                id="admin-clientid"
                label="Admin ClientID"
                fullWidth={true}
                autoFocus={true}
                type="text"
                value={this.state.clientid}
                onChange={e => this.change(e)}
                margin="normal"
              /><br />
              <TextField
                name="username"
                id="admin-username"
                label="Admin Username"
                fullWidth={true}
                type="text"
                value={this.state.username}
                onChange={e => this.change(e)}
                margin="normal"
              /><br />
              <TextField
                name="password"
                id="password-input"
                label="Password"
                fullWidth={true}
                type="password"
                value={this.state.password}
                onChange={e => this.change(e)}
                autoComplete="current-password"
                margin="normal"
                />
              <div style={{paddingTop: 20}}>
                <Button variant="contained" type="submit" color="primary" fullWidth={true}>
                  Log in to get started
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <ToastContainer />
      </div>
    );
  }
}
export { Login };