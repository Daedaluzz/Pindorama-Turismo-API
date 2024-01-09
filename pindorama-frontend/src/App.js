import './App.css';
import { useEffect } from "react"
import Sidebar from './components/sidebar/sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Usuarios, UsuariosCadastro, UsuariosBuscarId} from './pages/usuarios';

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
        <Route path='/usuarios' element={<UsuariosCadastro/>} />
        <Route path='/usuarios' element={<UsuariosBuscarId/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
