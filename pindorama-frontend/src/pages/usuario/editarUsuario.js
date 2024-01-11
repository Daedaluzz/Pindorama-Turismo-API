import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

//EDIT USER PAGE
export function UsuariosEditar() {
    const { id } = useParams();
    const [newUsuario, setNewUsuario] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        tipoUsuario: '',
        senha: '',
        viagens: [],
    });

    const handleInputChange = (e) => {
        setNewUsuario({ ...newUsuario, [e.target.name]: e.target.value });
    };

    const [enums, setEnums] = useState({ TipoUsuario: [] });

    useEffect(() => {
        axios
            .get('https://localhost:7169/api/Enum')
            .then((response) => {
                setEnums(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar a lista de enums.');
            });

        if (id) {
            // Fetch user details by UsuarioID and set them in the state
            axios
                .get(`https://localhost:7169/api/Usuarios/${id}`)
                .then((response) => {
                    setNewUsuario(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar os detalhes do usuário.');
                });
        }
    }, [id]);
    const navigate = useNavigate();
    const handleUpdateUsuario = () => {
        try {
            // Update existing Usuário
            axios
                .put(`https://localhost:7169/api/Usuarios/${id}`, newUsuario)
                .then((response) => {
                    alert('Usuário atualizado com sucesso!');
                    navigate('/usuarios');
                })
                .catch((error) => {
                    alert('Erro ao atualizar o usuário:' + error);
                });
        } catch (error) {
            console.error('Erro ao buscar os detalhes do usuário.');

        }
    };

    return (
        <div className='usuarios'>
            <h1>Editar Usuário</h1>
            <form>
                <label for='nome'>Nome</label>
                <input type='text'
                    name='nome'
                    placeholder='Nome do Usuário'
                    onChange={handleInputChange}
                    value={newUsuario.nome}>
                </input>

                <label for='cpf'>Cpf</label>
                <input type='text'
                    name='cpf'
                    placeholder='00000000000'
                    onChange={handleInputChange}
                    value={newUsuario.cpf}>
                </input>

                <label for='email'>E-mail</label>
                <input type='text'
                    name='email'
                    placeholder='zeka@hotmail.com'
                    onChange={handleInputChange}
                    value={newUsuario.email}>
                </input>

                <label for='telefone'>Telefone</label>
                <input type='text'
                    name='telefone'
                    placeholder='31984758544'
                    onChange={handleInputChange}
                    value={newUsuario.telefone}>
                </input>

                <label for='dataNascimento'>Data de Nascimento</label>
                <input type='date'
                    name='dataNascimento'
                    placeholder='01/01/2001'
                    onChange={handleInputChange}
                    value={newUsuario.dataNascimento}>
                </input>

                <label for='tipoUsuario'>Tipo do Usuário</label>
                <select name="tipoUsuario" value={newUsuario.tipoUsuario}
                    onChange={handleInputChange}>
                    {enums.TipoUsuario.map((credencial) => (
                        <option key={credencial}
                            value={credencial.value}>
                            {credencial}
                        </option>
                    ))}
                </select>
                <label for='senha'>Senha</label>
                <input type='password'
                    name='senha'
                    placeholder='******'
                    onChange={handleInputChange}
                    value={newUsuario.senha}>
                </input>
                <button type='button' onClick={handleUpdateUsuario}>
                    Atualizar
                </button>
            </form>
        </div>
    );
}