import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ЦtrФva</Link>
        <div className="collpase navbar-collapse">
        <ul id="nav" className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
            <Link to="/gear-list" className="nav-link">Gear List</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create-log" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create-users" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create-gear" className="nav-link">Create Gear</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}