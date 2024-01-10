import './App.css';
import { useEffect } from "react"
import Sidebar from './components/sidebar/sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Usuarios, UsuariosCadastro, UsuariosBuscarId, UsuariosEditar} from './pages/usuarios';

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
        <Route path='/usuarios' element={<UsuariosBuscarId/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
