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

export function PassagensBuscarId() {

    const [passagem, setPassagem] = useState([])
    const [id, setId] = useState([])

    const handleInputChange = (e) => {
        setId(e.target.value);
    };
    const handleBuscarPassagem = () => {
        axios
          .get(`https://localhost:7169/api/Passagens/${id}`)
          .then((response) => {
            setPassagem(response.data);
          })
          .catch((error) => {
            alert('Não foi possível encontrar a passagen com o ID informado.');
            console.error('Erro ao buscar os detalhes da passagem.', error);
          });
      };

   
    return (
        <div className='passagens'>
            <h1>Buscar Passagem por ID</h1>
            <h2>Digite o ID da passagem que deseja buscar:</h2>
            <DivId>
            <InputId type='text'onChange={handleInputChange}/>
            <button className='btnBuscar' type='button' onClick={handleBuscarPassagem}>Buscar</button>
            </DivId>
        <section>
        <div className="element2">
            <h5>Cidade de Destino</h5>
        <h2>{passagem.cidadeDestino}</h2>
        <h5>ID</h5>
        <h2>{passagem.passagemId}</h2>
        <h5>Cidade de Origem</h5>
        <h2>{passagem.cidadeOrigem}</h2>
    </div>
        <h3>Dados da Passagem</h3>
        <div className="element">
            <h4>Número do Bilhete:</h4>
            <p>{passagem.numeroBilhete}</p>
        </div>
        <div className="element">
            <h4>Assento:</h4>
            <p>{passagem.assento}</p>
        </div>
        <div className="element">
            <h4>Portão:</h4>
            <p>{passagem.portao}</p>
        </div>
        <div className="element">
            <h4>Terminal:</h4>
            <p>{passagem.terminal}</p>
        </div>
        <div className="element">
            <h4>Embarque:</h4>
            <p>{passagem.embarque}</p>
        </div>
        <div className="element">
            <h4>Preço</h4>
        <p>{passagem.preco}</p>
        </div>
    </section>
    </div>
    )
}