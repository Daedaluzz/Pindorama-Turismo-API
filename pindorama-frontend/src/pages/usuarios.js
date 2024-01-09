import axios from 'axios'
import React, { useState, useEffect } from 'react'

export function Usuarios() {
    const [usuarios, setUsuarios] = useState([])
    useEffect(() => {
        axios
            .get('https://localhost:7169/api/Usuarios')
            .then((response) => {
                setUsuarios(response.data)
            })
            .catch((error) => {
                console.error('Erro ao buscar a lista de usuários.')
            })
    })
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
                                    <a type="button" href={`/usuarios/${usuario.id}`}>Editar</a>
                                    <a type="button" href={`/usuarios/${usuario.id}`} onClick={() => window.confirm('Tem certeza que deseja excluir o usuario?')}>Excluir</a>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    )
}
export function UsuariosCadastro() {
    return (
        <div className='usuarios'>
            <h1>usuarios</h1>
        </div>
    )
}
export function UsuariosBuscarId() {
    return (
        <div className='usuarios'>
            <h1>usuarios</h1>
        </div>
    )
}

