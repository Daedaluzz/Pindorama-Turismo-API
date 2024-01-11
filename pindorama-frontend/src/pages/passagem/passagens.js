import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';


//USERS PAGE
export function Passagens() {
    const [Passagens, setPassagens] = useState([])
    const { id } = useParams();
    useEffect(() => {
        axios
            .get('https://localhost:7169/api/Passagens')
            .then((response) => {
                setPassagens(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar a lista de passsagens.');
            });
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const navigate = useNavigate();
    const handleDeletePassagem = (passagemId) => {
        axios
          .delete(`https://localhost:7169/api/Passagens/${passagemId}`)
          .then((response) => {
            alert("Passagem deletada com sucesso!");
            navigate('/passagens');
          })
          .catch((error) => {
            alert("Erro ao deletar o passagem: " + error);
          });
      };
    return (
        <div className='passagens'>
            <h1>Passagens</h1>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Cidade de Destino</td>
                        <td>Cidade de Origem</td>
                        <td>Número do Bilhete</td>
                        <td>Assento</td>
                        <td>Portão</td>
                        <td>Termianal</td>
                        <td>Embarque</td>
                        <td>Preço</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {Passagens.map((passagem) => (
                        <tr key={passagem.passagemId}>
                            <td>{passagem.passagemId}</td>
                            <td>{passagem.cidadeDestino}</td>
                            <td>{passagem.cidadeOrigem}</td>
                            <td>{passagem.numeroBilhete}</td>
                            <td>{passagem.assento}</td>
                            <td>{passagem.portao}</td>
                            <td>{passagem.terminal}</td>
                            <td>{passagem.embarque}</td>
                            <td>R$: {passagem.preco}</td>
                            <td className='bts'>
                                <div className='buttons'>
                                    <a type="button" href={`/passagens/editar/${passagem.passagemId}`}>Editar</a>
                                    <a type="button"
                                        href=''
                                        onClick={() => {
                                            const confirmed = window.confirm('Tem certeza que deseja excluir a passagem?');
                                            if (confirmed) {
                                                handleDeletePassagem(passagem.passagemId);
                                            }
                                        }}>Excluir</a>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    )
}