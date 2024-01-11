import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'


const InputId = styled.input`
width: 100%;
max-width: 40rem;
border-radius: 0.5rem 0 0 0.5rem;
`;
const DivId = styled.div`
display: flex;

`;



export function UsuariosBuscarId() {

    const [usuario, setUsuario] = useState([])
    const [id, setId] = useState([])

    const handleInputChange = (e) => {
        setId(e.target.value);
    };
    const handleBuscarUsuario = () => {
        axios
          .get(`https://localhost:7169/api/Usuarios/${id}`)
          .then((response) => {
            setUsuario(response.data);
          })
          .catch((error) => {
            alert('Não foi possível encontrar o usuário com o ID informado.');
            console.error('Erro ao buscar os detalhes do usuário.', error);
          });
      };

   
    return (
        <div className='usuarios'>
            <h1>Buscar Usuário por ID</h1>
            <h2>Digite o ID do usuário que deseja buscar:</h2>
            <DivId>
            <InputId type='text'onChange={handleInputChange}/>
            <button className='btnBuscar' type='button' onClick={handleBuscarUsuario}>Buscar</button>
            </DivId>
        <section>
        <div className="element2">
            <h5>Nome</h5>
        <h2>{usuario.nome}</h2>
        <h5>ID</h5>
        <h2>{usuario.usuarioId}</h2>
        <h5>Tipo de Usuário</h5>
        <h2>{usuario.tipoUsuario}</h2>
    </div>
        <h3>Dados Pessoais</h3>
        <div className="element">
            <h4>CPF:</h4>
            <p>{usuario.cpf}</p>
        </div>
        <div className="element">
            <h4>E-MAIL:</h4>
            <p>{usuario.email}</p>
        </div>
        <div className="element">
            <h4>TELEFONE:</h4>
            <p>{usuario.telefone}</p>
        </div>
        <div className="element">
            <h4>DATA DE NASCIMENTO:</h4>
        <p>{usuario.dataNascimento}</p>
        </div>
    </section>
    </div>
    )
}