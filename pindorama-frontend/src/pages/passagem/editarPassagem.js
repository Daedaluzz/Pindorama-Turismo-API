import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

//EDIT USER PAGE
export function PassagensEditar() {
    const { id } = useParams();
    const [newPassagem, setNewPassagem] = useState({
        cidadeDestino: '',
        cidadeOrigem: '',
        numeroBilhete: '',
        assento: '',
        portao: '',
        terminal: '',
        embarque: '',
        preco: '',
        acoes: '',
        pacotes: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setNewPassagem({ ...newPassagem, [name]: value });
    };

    const [enums, setEnums] = useState({ Assento: [], Portao: [], Terminal: [] })

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
            // Fetch user details by PassagemID and set them in the state
            axios
                .get(`https://localhost:7169/api/Passagens/${id}`)
                .then((response) => {
                    setNewPassagem(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar os detalhes da passagem.');
                });
        }
    }, [id]);
    const navigate = useNavigate();
    const handleUpdatePassagem = () => {
        try {
            // Update existing Passagem
            axios
                .put(`https://localhost:7169/api/Passagens/${id}`, newPassagem)
                .then((response) => {
                    alert('Passagem atualizada com sucesso!');
                    navigate('/passagens');
                })
                .catch((error) => {
                    console.error('Error updating passagem:', error.response.data);
                    alert('Erro ao atualizar a passagem:' + error.response.data);
                });
        } catch (error) {
            console.error('Erro ao buscar os detalhes da passagem.');

        }
    };

    return (
        <div className='passagens'>
            <h1>Atualizar Passagem</h1>
            <form>
                <label for='cidadeDestino'>Cidade de Destino</label>
                <input type='text'
                    name='cidadeDestino'
                    placeholder='Cidade de Destino'
                    onChange={handleInputChange}
                    value={newPassagem.cidadeDestino}>
                </input>

                <label for='cidadeOrigem'>Cidade de Origem</label>
                <input type='text'
                    name='cidadeOrigem'
                    placeholder='Cidade de Origem'
                    onChange={handleInputChange}
                    value={newPassagem.cidadeOrigem}>
                </input>

                <label for='numeroBilhete'>Numero do Bilhete</label>
                <input type='text'
                    name='numeroBilhete'
                    placeholder='00000'
                    onChange={handleInputChange}
                    value={newPassagem.numeroBilhete}>
                </input>


                <label for='assento'>Assento</label>
                <select name="assento" value={newPassagem.assento}
                    required
                    onChange={handleInputChange}>
                    <option value="" disabled>Selecione o Assento</option>
                    {enums.Assento.map((lugar) => (
                        <option key={lugar} value={lugar}>
                            {lugar}
                        </option>
                    ))}
                </select>
                <label for='portao'>Portão</label>
                <select name="portao" value={newPassagem.portao}
                    required
                    onChange={handleInputChange}>
                    <option value="" disabled>Selecione o Portão</option>
                    {enums.Portao.map((por) => (
                        <option key={por} value={por}>
                            {por}
                        </option>
                    ))}
                </select>
                <label for='terminal'>Terminal</label>
                <select name="terminal" value={newPassagem.terminal}
                    required
                    onChange={handleInputChange}>
                    <option value="" disabled>Selecione o Terminal</option>
                    {enums.Terminal.map((ter) => (
                        <option key={ter} value={ter}>
                            {ter}
                        </option>
                    ))}
                </select>
                <label for='embarque'>Embarque</label>
                <input type='datetime-local'
                    name='embarque'
                    placeholder='01/01/2001'
                    onChange={handleInputChange}
                    value={newPassagem.embarque}>
                </input>
                <label for='preco'>Preço</label>
                <input type='text'
                    name='preco'
                    placeholder='9999.99'
                    onChange={handleInputChange}
                    value={newPassagem.preco}>
                </input>
                <button type='button' onClick={handleUpdatePassagem}>Atualizar</button>
            </form>
        </div>
    )
}