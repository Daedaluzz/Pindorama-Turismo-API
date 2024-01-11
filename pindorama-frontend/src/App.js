import './App.css';
import { useEffect } from "react"
import Sidebar from './components/sidebar/sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Usuarios} from './pages/usuario/usuarios';
import {UsuariosCadastro} from './pages/usuario/cadastroUsuario';
import {UsuariosEditar} from './pages/usuario/editarUsuario';
import {UsuariosBuscarId} from './pages/usuario/buscarUsuarioId';
import {Passagens} from './pages/passagem/passagens';
import {PassagensCadastro} from './pages/passagem/cadastroPassagem';
import {PassagensEditar} from './pages/passagem/editarPassagem';
import {PassagensBuscarId} from './pages/passagem/buscarPassagemId';
import {Pacotes} from './pages/pacote/pacotes';
import {PacotesCadastro} from './pages/pacote/cadastroPacote';
import {PacotesEditar} from './pages/pacote/editarPacote';
import {PacotesBuscarId} from './pages/pacote/buscarPacoteId';

function App() {

  useEffect(() => {
    document.title = "Pindorama API"
  }, [])
  return (
    <Router>
    <div className='app'>
      <Sidebar />
      <Routes>
        <Route path='/usuarios' element={<Usuarios/>} />
        <Route path='/usuarios/cadastrar' element={<UsuariosCadastro/>} />
        <Route path='/usuarios/editar/:id' element={<UsuariosEditar />} />
        <Route path='/usuarios/buscar/:id' element={<UsuariosBuscarId/>} />
        <Route path='/passagens' element={<Passagens/>} />
        <Route path='/passagens/cadastrar' element={<PassagensCadastro/>} />
        <Route path='/passagens/editar/:id' element={<PassagensEditar />} />
        <Route path='/passagens/buscar/:id' element={<PassagensBuscarId/>} />
        <Route path='/pacotes' element={<Pacotes/>} />
        <Route path='/pacotes/cadastrar' element={<PacotesCadastro/>} />
        <Route path='/pacotes/editar/:id' element={<PacotesEditar />} />
        <Route path='/pacotes/buscar/:id' element={<PacotesBuscarId/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
