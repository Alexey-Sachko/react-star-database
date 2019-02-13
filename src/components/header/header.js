import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="header d-flex align-items-center py-3">
        <h1 className="px-3">
          <Link to="/">
            Star Db
          </Link>
        </h1>
        <ul className="nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/people/">
              People
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/planets/">
              Planets
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/starships/">
              Starships
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/secret">
              Secret
            </Link>
          </li>
        </ul>
      </header>
    )
  }
}