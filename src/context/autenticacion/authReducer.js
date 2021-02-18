import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types'

const reducer = (state, {type, payload}) => {
    switch(type){
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: payload,
                cargando: false,
            }
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
        case CERRAR_SESION:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                mensaje: payload,
                autenticado: false,
                usuario: null,
                cargando: false
            }
        default:
            return state
    }
}

export default reducer