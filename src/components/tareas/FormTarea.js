import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

    const { selectedProject } = useContext(proyectoContext)
    const { addTask, setTask, currentTasks, selectedTask, editTask } = useContext(tareaContext)

    const [dataForm, setDataForm] = useState({
        nombre: ''
    });

    const [error, setError] = useState(false);

    useEffect(() => {
        if(selectedTask === null) return
        setDataForm({
            nombre: selectedTask.nombre
        })
    }, [selectedTask]);

    if(selectedProject === null) return null

    const [proyectoActual] = selectedProject
    
    const isDuplicated = (taskName) => {
        let duplicated = false
        currentTasks.forEach(currentTask => {
            if(taskName.trim() === currentTask.nombre){
                duplicated = true
            }
        })
        return duplicated
    }

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(dataForm.nombre.trim() === '' || (isDuplicated(dataForm.nombre) && selectedTask === null)){
            setError(true)
            return
        }
        setError(false)

        if(selectedTask){
            editTask({ ...selectedTask, nombre: dataForm.nombre})
        } else {
            addTask({
                nombre: dataForm.nombre,
                proyectoId: proyectoActual._id
            })
        }
        
        setTask(proyectoActual._id)
        setDataForm({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={dataForm.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={selectedTask === null ? "Agregar Tarea" : 'Editar tarea'}
                    />
                </div>
            </form>
            { error ? <p className="mensaje error">El nombre de la tarea es obligatorio o nombre de la tarea repetido</p> : null}
        </div>
    );
};

export default FormTarea;