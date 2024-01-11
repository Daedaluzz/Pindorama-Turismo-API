import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';


//USERS PAGE
export function Usuarios() {
    const [usuarios, setUsuarios] = useState([])
    const { id } = useParams();
    useEffect(() => {
        axios
            .get('https://localhost:7169/api/Usuarios')
            .then((response) => {
                console.log(response.data); // Log the data
                setUsuarios(response.data);
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar a lista de usuários.');
            });
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const navigate = useNavigate();
    const handleDeleteUsuario = (usuarioId) => {
        axios
          .delete(`https://localhost:7169/api/Usuarios/${usuarioId}`)
          .then((response) => {
            alert("Usuário deletado com sucesso!");
            navigate('/usuarios');
          })
          .catch((error) => {
            alert("Erro ao deletar o usuário: " + error);
          });
      };
    return (
        <div className='usuarios'>
            <h1>Usuários</h1>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nome</td>
                        <td>Cpf</td>
                        <td>Email</td>
                        <td>Telefone</td>
                        <td>Data de Nascimento</td>
                        <td>Credencial</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.usuarioId}>
                            <td>{usuario.usuarioId}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.cpf}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.telefone}</td>
                            <td>{usuario.dataNascimento}</td>
                            <td>{usuario.tipoUsuario}</td>
                            <td className='bts'>
                                <div className='buttons'>
                                    <a type="button" href={`/usuarios/editar/${usuario.usuarioId}`}>Editar</a>
                                    <a type="button"
                                        href=''
                                        onClick={() => {
                                            const confirmed = window.confirm('Tem certeza que deseja excluir o usuário?');
                                            if (confirmed) {
                                                handleDeleteUsuario(usuario.usuarioId);
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



