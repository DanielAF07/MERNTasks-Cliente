import React, {useReducer, useEffect} from 'react'
import { AGREGAR_TAREA, ESTADO_TAREA, ELIMINAR_TAREA, OBTENER_TAREAS, EDITAR_TAREA, SELECCIONAR_TAREA, LLENAR_TAREAS } from '../../types'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import clienteAxios from '../../config/axios'

const TareaState = (props) => {
    const initialState = {
        currentTasks: null,
        selectedTask: null
    }

    // Dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    // Tareas CRUD
    const setTask = async (projectId) => {
        try {
            const response = await clienteAxios.get(`/api/tareas/${projectId}`)
            dispatch({
                type: OBTENER_TAREAS,
                payload: {
                    id: projectId,
                    tasks: response.data.tareas
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    //Agregar tarea (Requiere objeto)
    const addTask = async (task) => {
        try {
            await clienteAxios.post('/api/tareas', task)
            dispatch({
                type: AGREGAR_TAREA,
                payload: task
            })
        } catch (error) {
            console.log(error);
        }
    }
    //ELiminar tarea
    const deleteTask = async (id) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`)
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }
    // Editar estado
    const taskDone = async (id) => {
        try {
            let task = state.currentTasks.filter(task => task._id === id)[0]
            await clienteAxios.put(`/api/tareas/${id}`, { estado: !task.estado })
            dispatch({
                type: ESTADO_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
        
    }
    // Mandar tarea para editar
    const editTask = async (task) => {
        try {
            await clienteAxios.put(`/api/tareas/${task._id}`, task)
            dispatch({
                type: EDITAR_TAREA,
                payload: task
            })
        } catch (error) {
            console.log(error);
        }
    }
    // Seleccionar tarea para editarlo localmente
    const selectTask = (id) => {
        dispatch({
            type: SELECCIONAR_TAREA,
            payload: id
        })
    }

    return (
        <TareaContext.Provider
        value= {{
            tareas: state.tareas,
            currentTasks: state.currentTasks,
            selectedTask: state.selectedTask,
            setTask,
            addTask,
            deleteTask,
            taskDone,
            editTask,
            selectTask
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState