import React, {Component} from 'react';
import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import { 
  PeoplePage,
  PlanetsPage,
  StarhipsPage,
  LoginPage,
  SecretPage 
} from '../pages';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    isError: false,
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  render() {

    const { isLoggedIn } = this.state;

    return (
      <SwapiServiceProvider value={this.swapiService}>
        <Router>
          <div className="app">
            <div className="container">
              <div className="row">
                <div className="col mx-auto">
                  <Header />
                  <RandomPlanet updateInterval={20000}/>

                  <Switch>
                    <Route 
                      path="/" 
                      render={() => <h2>Welcome to Star Database</h2>}
                      exact />
                    <Route 
                      path="/people" 
                      render={() => <h2>People</h2>}
                      exact />
                    <Route 
                      path="/planets" 
                      render={() => <h2>Planets</h2>}
                      exact />
                    <Route 
                      path="/starships" 
                      render={() => <h2>Starships</h2>}
                      exact />
                    <Route path="/people/:id?" component={PeoplePage} />
                    <Route path="/planets" component={PlanetsPage} />
                    <Route path="/starships" component={StarhipsPage} exact/>
                    <Route 
                      path="/starships/:id"
                      render={({ match, location, history }) => {
                        const { id } = match.params;
                        return <StarshipDetails itemId={id}/>
                      }}/>
                    <Route path="/login" 
                      render={() => (
                        <LoginPage 
                          isLoggedIn={isLoggedIn}
                          onLogin={this.onLogin}/>
                      )}/>
                    <Route path="/secret" 
                      render={() => (
                        <SecretPage isLoggedIn={isLoggedIn} />
                      )}/>
                    <Route render={() => <h2>Page not found</h2>}/>
                  </Switch>

                </div>
              </div>
            </div>
          </div>
          </Router>
      </SwapiServiceProvider>
    )
  }
}