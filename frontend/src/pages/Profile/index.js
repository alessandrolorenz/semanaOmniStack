import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function Profile() {

  const [incidents, setIncidents] = useState([]);
  
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  // dispara uma acao - (funcao a ser exec, [quando?(uma variavel mudando por ex.)])
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(resp => {
      setIncidents(resp.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== id));

    } catch (err) {
      alert('Erro ao deletar caso. ' + err);
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');

  }

  function goAll(){
    history.push('/all');
  }

  return (
    <div className="profile-container">
      <header>
      <img src={logoImg} alt="Be the hero"/>
      <span>Ben vinda, {ongName}</span>


        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={goAll} type="button">
         <small>Lista</small> 
          {/* <FiPower size={18} color="#e02041" /> */}
        </button>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos Registrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso: </strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO: </strong>
            <p>{incident.description}</p>

            <strong>VALOR: </strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              {/* conClick={handleDeleteIncident(incident.id)} -> executa e passa o retorno - ela é exec assim que o comp é mostrado e deleta tudo */}
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}


      </ul>

    </div>
  );
}