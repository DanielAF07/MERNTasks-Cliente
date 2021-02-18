import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = props => {

    const { alerta, mostrarAlerta } = useContext(AlertaContext)

    const { registrarUsuario, mensaje, autenticado, usuarioAutenticado } = useContext(AuthContext)

    // En caso de algun error en el registro
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
    
    const [dataForm, setDataForm] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const { email, password, nombre, confirmar } = dataForm

    const handleChange = e => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Validación
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }
        // Validación largo de contraseña
        if(password.length < 6){
            mostrarAlerta('La contraseña debe tener al menos 6 caracteres', 'alerta-error')
            return
        }
        // Validación de repetición de contraseña
        if(password !== confirmar){
            mostrarAlerta('Los passwords no coinciden', 'alerta-error')
            return
        }
        // Pasar al Action
        registrarUsuario({
            nombre, email, password
        })


    }
    return (
        <div className="form-usuario">
            { alerta ? <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Tu Nombre"
                            onChange={handleChange}
                            value={nombre}
                        />
                    </div>
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
                    <label htmlFor="password">Confirmar Password</label>
                        <input 
                            type="password" 
                            name="confirmar"
                            id="confirmar"
                            placeholder="Repite tu password"
                            onChange={handleChange}
                            value={confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            value="Registrarme" 
                            className="btn btn-primario btn-block"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    );
};

NuevaCuenta.propTypes = {
    
};

export default NuevaCuenta;