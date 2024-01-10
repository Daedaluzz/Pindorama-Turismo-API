import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


//USERS PAGE
export function Usuarios() {
    const [usuarios, setUsuarios] = useState([])
    const { id } = useParams();
    useEffect(() => {
        axios
            .get('https://localhost:7169/api/Usuarios')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar a lista de usuários.');
            });
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const handleDeleteUsuario = (usuarioId) => {
        axios
          .delete(`https://localhost:7169/api/Usuarios/${usuarioId}`)
          .then((response) => {
            alert("Usuário deletado com sucesso!");
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

//CREATE USER PAGE
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
        setNewUsuario({ ...newUsuario, [e.target.name]: e.target.value });
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

    const handleAddUsuario = () => {
        axios
            .post("https://localhost:7169/api/Usuarios", newUsuario)
            .then((response) => {
                alert("Usuário cadastrado com sucesso!");
            })
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
                <button type='button' onClick={handleAddUsuario}>Cadastrar</button>
            </form>
        </div>
    )
}


//EDIT USER PAGE
export function UsuariosEditar() {
    const { id } = useParams();
    console.log('Usuario ID:', id);
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

    const handleAddOrUpdateClient = () => {
        try {
            // Update existing user
            axios
                .put(`https://localhost:7169/api/Usuarios/${id}`, newUsuario)
                .then((response) => {
                    alert('Usuário atualizado com sucesso!');
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
                <button type='button' onClick={handleAddOrUpdateClient}>
                    Atualizar
                </button>
            </form>
        </div>
    );
}

export function UsuariosBuscarId() {
    return (
        <div className='usuarios'>
            <h1>usuarios</h1>
        </div>
    )
}

