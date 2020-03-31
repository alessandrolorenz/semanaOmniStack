import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Incidents() {

  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('incidents').then(resp => {
      setIncidents(resp.data);
    })
  }, [])

   function details(id) {
     const oneIncident = incidents.filter(inc => inc.id === id);
     console.log(oneIncident);
    const result = `Ajude a ONG: ${oneIncident[0].name} no caso: ${oneIncident[0].title}. Entre em contato pelo 
    whatsapp: ${oneIncident[0].whatsapp}. Agradecemos de coração!`
     alert(result);
   }

   function goOngs(){
    history.push('/ongs');
  }

  return (
    <div className="incidents-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>A Little Help From my Friend</span>

        <Link className="button" to="/">Logon</Link>

        <button onClick={goOngs} type="button">
         <small>Lista Ongs</small> 
        </button> 
        
      </header>
      <h1>Casos que precisam de um coração caridoso</h1>

      <ul>
        {incidents.map(incident =>(
          <li key={incident.id}>
            <h1>ONG: {incident.name}</h1>
            <strong>Caso: {incident.title} </strong>
            <p>{incident.description}</p>
            <strong>VALOR: </strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
            
            <button onClick={() => details(incident.id)} type="button">
              <FiLogIn size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}

      </ul>

    </div>
  )
}