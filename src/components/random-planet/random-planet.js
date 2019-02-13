import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import PropTypes from 'prop-types';
import './random-planet.css';

export default class RandomPlanet extends Component {

  static defaultProps = {
    updateInterval: 5000
  };

  static propTypes = {
    updateInterval: PropTypes.number
  };

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  };

  onError = (err) => {
    this.setState({
      loading: false,
      error: true
    });
  };

  updatePlanet = () => {
    const id = Math.round(Math.random()*10) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={ planet }/> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;

    return (
      <div className="random-planet d-flex align-items-center jumbotron mb-3 p-4 rounded">
        { spinner }
        { content }
        { errorMessage }
      </div>
    )
  }
}

RandomPlanet.defaultProps = {
  updateInterval: 5000
};

const PlanetView = ({ planet }) => {

  const { id = 2, name, population,  rotationPeriod, diameter } = planet;


  return (
    <React.Fragment>
      <div className="random-planet__img mr-5">
        <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} 
          className="w-100 h-100 rounded"
          alt="img"/>
      </div>
      <div className="random-planet__text">
        <h3>
          {name}
        </h3>
        <ul className="random-planet__params list-group list-group-flush mt-3">
          <li className="list-group-item px-0 py-2">
            Population {population}
          </li>
          <li className="list-group-item px-0 py-2">
            Rotation Period {rotationPeriod}
          </li>
          <li className="list-group-item px-0 py-2">
            Diameter {diameter}
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}