import React, { useReducer } from 'react';
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types'

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: false,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos)

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            //Obtener usuario
            usuarioAutenticado()
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // retorna usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if(token){
            // Enviar token por headers
            tokenAuth(token)
            try {
                const respuesta = await clienteAxios.get('/api/auth')
                dispatch({
                    type: OBTENER_USUARIO,
                    payload: respuesta.data.usuario
                })
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: LOGIN_ERROR
                })
            }
        }
    }

    // El usuario inicia sesión
    const iniciarSesion = async datos => {
        try {
            const response = await clienteAxios.post('/api/auth', datos)
            if(response.status === 200){
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: response.data
                })

                usuarioAutenticado()
            }
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token:  state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion,
                usuarioAutenticado
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState