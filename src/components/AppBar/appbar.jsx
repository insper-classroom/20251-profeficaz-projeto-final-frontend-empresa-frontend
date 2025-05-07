import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './AppBar.css';

const AppBar = () => {
  return (
    <header className="appbar">
      <Link to="/">
        <img src={logo} alt="Logo Empresa" className="logo" />
      </Link>
    </header>
  );
};

export default AppBar;
