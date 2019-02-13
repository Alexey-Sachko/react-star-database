import React, { Component } from 'react';

export default class ToggleRandom extends Component {

  render() {

    return (
      <button className="btn btn-warning mb-3" onClick={this.props.onToggleRandom}>Toggle Random Planet</button>
    )
  }
}
