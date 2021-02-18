import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Proyecto = ({proyecto}) => {

    const { selectProject } = useContext(proyectoContext)
    const { setTask } = useContext(tareaContext)

     const handleClick = e => {
        selectProject(proyecto._id)
        setTask(proyecto._id)
     }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={handleClick}
            >{proyecto.nombre}</button>
        </li>
    );
};

export default Proyecto;