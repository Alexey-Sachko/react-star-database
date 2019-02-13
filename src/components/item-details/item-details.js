import React, { Component } from 'react';
import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="item-details__term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  )
}

export {
  Record
}

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: false,
    hasError: false,
    renderError: false
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if(!itemId) {
      return;
    }
    this.setState({
      loading: true
    });
    
    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item),
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          hasError: true
        });
      });
  }

  renderError = () => {
    this.setState({
      renderError: true
    })
  }

  render() {

    const { item, loading, hasError } = this.state;
    const { getImageUrl } = this.props;

    const hasData = !(loading || !item || hasError);
    const span = !loading && !item && !hasError ? <span className="mx-auto">Please select an item</span> : null;
    const content = hasData ? <PersonDetailsView item={item} getImage={getImageUrl} prChild={this.props.children}/> : null;
    const spinner = loading ? <Spinner /> : null;
    const error = hasError ? <div className="my-3 mx-auto"><ErrorIndicator /></div> : null;

    if (this.state.renderError) {
      this.foo.bar = 0;
    }

    return (
      <div className="item-details card flex-row align-items-center">
        { content }
        { spinner }
        { span }
        { error }
        <button className="btn btn-danger" onClick={this.renderError}>Throw Error</button>
      </div>
    )
  }
}

const PersonDetailsView = ({item, getImage, prChild}) => {

  const { id, name } = item;

  return (
    <React.Fragment>
      <div className="item-details__img p-3">
        <img src={getImage(id)}
            className="w-100 rounded"
            alt="character"/>
      </div>
      <div className="card-body">
        <h4 className="card-title">
          { name }
        </h4>
        <ul className="list-group list-group-flush">
          { 
            React.Children.map(prChild, (child) => {
              return React.cloneElement(child, {item});
            })
          }
        </ul>
      </div>
      
    </React.Fragment>
  )
}