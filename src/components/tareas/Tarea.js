import React, {useContext, useState } from 'react';
import tareaContext from '../../context/tareas/tareaContext'
const Tarea = ({tarea}) => {

    const { deleteTask, setTask, taskDone, selectTask } = useContext(tareaContext)

    // const [intento, setIntento] = useState(false);

    const handleDeleteClick = (e) => {
        deleteTask(tarea._id)
        setTask(tarea.proyectoId)
    }

    const handleDoneClick = (e) => {
        taskDone(tarea._id)
        setTask(tarea.proyectoId)
    }

    const handleEditClick = (e) => {
        // setIntento(!intento)
        selectTask(tarea._id)
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado ?
                (
                    <button
                        type="button"
                        className="completo"
                        onClick={handleDoneClick}
                    >Completo</button>
                ):
                (
                    <button
                        type="button"
                        className="incompleto"
                        onClick={handleDoneClick}
                    >Incompleto</button>

                )}
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={handleEditClick}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={handleDeleteClick}
                >Eliminar</button>
            
            </div>
        </li>
    );
};

export default Tarea;