import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//CREATE PASSAGEM PAGE
export function PassagensCadastro() {
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
        pacotes: [],
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
                setEnums(response.data)
            })
            .catch((error) => {
                console.error('Erro ao buscar a lista de enums.')
            })
    }, [])
    const navigate = useNavigate();
    const handleAddPassagem = () => {
        try {
            axios
                .post("https://localhost:7169/api/Passagens", newPassagem)
                .then((response) => {
                    alert("Passagem cadastrada com sucesso!");
                    navigate('/passagens');

                })
        } catch (error) {
            alert('Não foi possível cadastrar a passagem, verifique os campos abaixo.');
        }
    };
    return (
        <div className='passagens'>
            <h1>Cadastrar Passagem</h1>
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
                <button type='button' onClick={handleAddPassagem}>Cadastrar</button>
            </form>
        </div>
    )
}