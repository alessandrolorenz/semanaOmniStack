import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Incidents() {

  const [ongs, setOngs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('ongs').then(resp => {
      setOngs(resp.data);
    })
  }, [])


  function goAll(){
    history.push('/all');
  }



  return (
    <div className="ongs-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Ongs Cadstradas</span>

        <Link className="button" to="/">Logon</Link>

        <button onClick={goAll} type="button">
         <small>Lista</small> 
        </button> 
        
      </header>
      <h1>Casos que precisam de um coração caridoso</h1>

      <ul>
        {ongs.map(ong =>(
          <li key={ong.id}>
            <h1>ONG: {ong.name}</h1>
            <strong>Caso: {ong.email} </strong>
            <p>{ong.whatsapp}</p>
            <p>{ong.city}</p>
            <p>{ong.uf}</p>
          </li>
        ))}

      </ul>

    </div>
  )
}