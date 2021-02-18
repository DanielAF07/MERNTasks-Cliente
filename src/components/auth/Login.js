import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'
import Spinner from '../misc/Spinner'

const Login = props => {

    const { alerta, mostrarAlerta } = useContext(AlertaContext)

    const { iniciarSesion, mensaje, autenticado, usuarioAutenticado, cargando } = useContext(AuthContext)

    const [dataForm, setDataForm] = useState({
        email: '',
        password: ''
    });

    const { email, password } = dataForm

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos')
        } else {
            usuarioAutenticado()
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
    }, [mensaje, autenticado, props.history])

    const handleChange = e => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validación
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        iniciarSesion({email, password})

    }

    return (
        <>
            <div 
                className="form-usuario"
                onSubmit={handleSubmit}
            >
                { alerta ? <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> : null }
                <div className="contenedor-form sombra-dark">
                    <h1>Iniciar Sesión</h1>
                    <form>
                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Tu Email"
                                onChange={handleChange}
                                value={email}
                            />
                        </div>
                        <div className="campo-form">
                        <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password"
                                id="password"
                                placeholder="Tu Password"
                                onChange={handleChange}
                                value={password}
                            />
                        </div>
                        <div className="campo-form">
                            <input 
                                type="submit" 
                                value="Iniciar Sesión" 
                                className="btn btn-primario btn-block"
                            />
                        </div>
                    </form>
                    <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                        Registrarse
                    </Link>
                </div>
            </div>
        </>
    );
};

Login.propTypes = {
    
};

export default Login;