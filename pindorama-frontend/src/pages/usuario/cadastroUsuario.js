import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//CREATE USUÁRIO PAGE
export function UsuariosCadastro() {
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

        const { name, value } = e.target;
        console.log(name, value)
        setNewUsuario({ ...newUsuario, [name]: value });
    };

    const [enums, setEnums] = useState({ TipoUsuario: [] })

    useEffect(() => {
        axios
            .get('https://localhost:7169/api/Enum')
            .then((response) => {
                setEnums(response.data)
            })
            .catch((error) => {
                console.error('Erro ao buscar a lista de enums.')
            })
    }, [])
    const navigate = useNavigate();
    const handleAddUsuario = () => {
        try {
            axios
                .post("https://localhost:7169/api/Usuarios", newUsuario)
                .then((response) => {
                    alert("Usuário cadastrado com sucesso!");
                    navigate('/usuarios');

                })
        } catch (error) {
            alert('Não foi possível cadastrar o usuário, verifique os campos abaixo.');
        }
    };
    return (
        <div className='usuarios'>
            <h1>Cadastrar Usuário</h1>
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
                    required
                    onChange={handleInputChange}>
                    <option value="" disabled>Selecione o tipo do usuário</option>
                    {enums.TipoUsuario.map((credencial) => (
                        <option key={credencial} value={credencial}>
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
                <button type='button' onClick={handleAddUsuario}>Cadastrar</button>
            </form>
        </div>
    )
}