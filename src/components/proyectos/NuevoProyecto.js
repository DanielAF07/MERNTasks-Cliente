import React, { useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'


const NuevoProyecto = () => {

    const { proyectos, showFormulario, showError, toggleNewProjectForm, newProject, newError } = useContext(proyectoContext)

    const [project, setProject] = useState({
        nombre: ''
    });

    const {nombre} = project

    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const isDuplicated = (name) => {
        let duplicated = false
        proyectos.forEach(proyecto => {
            if(name === proyecto.nombre){
                duplicated = true
            }
        })
        return duplicated
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(nombre.trim() === '' || isDuplicated(nombre)){
            newError()
            return
        }
        newProject(project)
        setProject({nombre: ''})
    }

    const newProjectForm = () => {
        return(
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={handleSubmit}
                >
                    <input 
                        type="text" 
                        name="nombre"
                        className="input-text"
                        placeholder="Nombre del proyecto"
                        value={nombre}
                        onChange={handleChange}
                    />
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-block" 
                        value="Agregar proyecto"
                    />
                </form>
        )
    }

    const handleClick = e => {
        toggleNewProjectForm()
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={handleClick}
            >Nuevo Proyecto</button>
            {showFormulario ? newProjectForm() : null}
            {showError && showFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio o el nombre está repetido</p> : null}
            
        </>
    );
};

export default NuevoProyecto;