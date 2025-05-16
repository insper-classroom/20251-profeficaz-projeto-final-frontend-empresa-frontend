import React from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import logo from '../../assets/logo.png';
import './AppBar.css';

// Fetch function for ministerios (Home data)
const fetchMinisteriosDataForAppBar = async () => {
  const { data } = await axios.get('/api/tabelas_de_dados');
  return data.data || [];
};

// Fetch function for noticias (Noticias data)
const fetchNoticiasDataForAppBar = async () => {
  const { data } = await axios.get('/api/noticias');
  return data.data || [];
};

const AppBar = () => {
  const queryClient = useQueryClient();

  const prefetchHome = () => {
    queryClient.prefetchQuery({
      queryKey: ['ministerios'],
      queryFn: fetchMinisteriosDataForAppBar,
    });
  };

  const prefetchNoticias = () => {
    queryClient.prefetchQuery({
      queryKey: ['noticias'],
      queryFn: fetchNoticiasDataForAppBar,
    });
  };

  return (
    <header className="appbar">
      <Link to="/" onMouseEnter={prefetchHome}>
        <img src={logo} alt="Logo Empresa" className="logo" />
      </Link>
      <nav>
        <Link to="/noticias" onMouseEnter={prefetchNoticias} className="appbar-link">
          Notícias
        </Link>
      </nav>
    </header>
  );
};

export default AppBar;
