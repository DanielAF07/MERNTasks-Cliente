import { EDITAR_TAREA, OBTENER_TAREAS, AGREGAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, SELECCIONAR_TAREA, LLENAR_TAREAS } from '../../types'

const actions = (state, action) => {
    switch(action.type){
        case OBTENER_TAREAS:
        return {
                ...state,
                // currentTasks: state.tareas.filter(tarea => tarea._id === action.payload)
                currentTasks: action.payload.tasks
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareas: [action.payload, ...state.currentTasks]
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareas: state.currentTasks.filter(tarea => tarea._id !== action.payload)
            }
        case ESTADO_TAREA:
            return {
                ...state,
                tareas: state.currentTasks.map(tarea => {
                    if(tarea._id === action.payload){
                        return {...tarea, estado: !tarea.estado}
                    } else {
                        return tarea
                    }
                }),
            }
        case EDITAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea),
                selectedTask: null
            }
        case SELECCIONAR_TAREA:
            return {
                ...state,
                selectedTask: state.currentTasks.filter(tarea => tarea._id === action.payload ? tarea : null)[0]
            }
        default:
            return state
    }
}

export default actions