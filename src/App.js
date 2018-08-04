import React, { Component } from 'react';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { Login } from './components/Login';
import { Main } from './components/Main';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppTheme from './config/theme';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/toastify.css';
import './styles/index.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={AppTheme}>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/" component={Main} exact/>
            <Route path="/login" component={Login}/>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export { App };