import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';


//USERS PAGE
export function Pacotes() {
    const [Pacotes, setPacotes] = useState([])
    const { id } = useParams();
    useEffect(() => {
        axios
            .get('https://localhost:7169/api/Pacotes')
            .then((response) => {
                setPacotes(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar a lista de pacotes.');
            });
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const navigate = useNavigate();
    const handleDeletePacote = (pacoteId) => {
        axios
          .delete(`https://localhost:7169/api/Pacotes/${pacoteId}`)
          .then((response) => {
            alert("Pacote deletado com sucesso!");
            navigate('/pacotes');
          })
          .catch((error) => {
            alert("Erro ao deletar o pacote: " + error);
          });
      };
    return (
        <div className='pacotes'>
            <h1>Pacotes</h1>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nome</td>
                        <td>Destino</td>
                        <td>Estadia</td>
                        <td>Data da Ida</td>
                        <td>Data da Volta</td>
                        <td>Promoção</td>
                        <td>Preço</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {Pacotes.map((pacote) => (
                        
                        <tr key={pacote.pacoteId}>
                            <td>{pacote.pacoteId}</td>
                            <td>{pacote.nome}</td>
                            <td>{pacote.destino}</td>
                            <td>{pacote.diasHospedagem}</td>
                            <td>{pacote.ida}</td>
                            <td>{pacote.volta}</td>
                            <td>{pacote.promocao === 1 ? 'Sim' : 'Não'}</td>
                            <td>R$: {pacote.preco}</td>
                            <td className='bts'>
                                <div className='buttons'>
                                    <a type="button" href={`/pacotes/editar/${pacote.pacoteId}`}>Editar</a>
                                    <a type="button"
                                        href=''
                                        onClick={() => {
                                            const confirmed = window.confirm('Tem certeza que deseja excluir o pacote?');
                                            if (confirmed) {
                                                handleDeletePacote(pacote.pacoteId);
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