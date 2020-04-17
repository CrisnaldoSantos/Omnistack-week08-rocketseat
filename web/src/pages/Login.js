import React, {useState} from 'react';
import './Login.css'
import logo from '../assets/logo.svg';
import api from '../services/api';
import catcherror from '../util/catcherror';

export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        await api.post('/devs',{username})
        .then((response)=>{
            const {_id} = response.data;
            localStorage.setItem('tindev-user',_id);
            history.push(`/dev/${_id}`);
        }).catch((error)=>{
            catcherror(error);
        })
    }

  return (
    <div className="login-container"> 
        <form onSubmit={handleSubmit}>
            <img src={logo} alt="tindev"/>
            <input 
                placeholder="Digite seu usuário no Github" 
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <button type="submit">Enviar</button>
        </form>
    </div>
  );
}
