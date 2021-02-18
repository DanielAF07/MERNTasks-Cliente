import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS, 
    AGREGAR_PROYECTO, 
    MOSTRAR_ERROR, 
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types'

import clienteAxios from '../../config/axios'

const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        showFormulario: false,
        showError: false,
        selectedProject: null,
    }

    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Funciones CRUD
    const toggleNewProjectForm = () => {
        dispatch({
            type: FORMULARIO_PROYECTO,
        })
    }

    const getProjects = async () => {
        try {
            const response = await clienteAxios.get('/api/proyectos')
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: response.data.proyectos
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Nuevo Proyecto
    const newProject = async project => {
        try {
            const response = await clienteAxios.post('/api/proyectos', project)
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Mostrar error
    const newError = () => {
        dispatch({
            type: MOSTRAR_ERROR
        })
    }

    // Seleccionar proyecto para trabajar
    const selectProject = projectId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: projectId
        })
    }

    const deleteProject = async projectId => {
        try {
            await clienteAxios.delete(`api/proyectos/${projectId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: projectId
            })
        } catch (error) {
            
        }
        
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                showFormulario: state.showFormulario,
                showError: state.showError,
                selectedProject: state.selectedProject,
                toggleNewProjectForm,
                getProjects,
                newProject,
                newError,
                selectProject,
                deleteProject
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState