import {AGREGAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTOS, MOSTRAR_ERROR, PROYECTO_ACTUAL, ELIMINAR_PROYECTO} from '../../types'

const actions = (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO: 
            return {
                ...state,
                showFormulario: !state.showFormulario
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                showError: false,
                showFormulario: false
            }
        case MOSTRAR_ERROR:
            return {
                ...state,
                showError: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                selectedProject: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter( proyecto => proyecto._id !== action.payload ),
                selectedProject: null,
            }
        default:
            return state;
    }
}

export default actions