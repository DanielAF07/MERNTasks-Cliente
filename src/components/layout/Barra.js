import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext'

const Barra = props => {
    
    const { usuario, usuarioAutenticado, cerrarSesion } = useContext(AuthContext)

    const handleClickLogOut = (e) => {
        cerrarSesion()
    }

    return (
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>{ usuario ? usuario.nombre : null}</span> </p>
            <nav className="nav-principal">
                <button
                    style={{'color': 'white'}}
                    className="btn btn-blank cerrar-sesion"
                    onClick={handleClickLogOut}
                >
                    Cerrar Sesión
                </button>
            </nav>
        </header>
    );
};

export default Barra;