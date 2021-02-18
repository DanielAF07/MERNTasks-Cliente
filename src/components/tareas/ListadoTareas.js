import React, { useContext } from 'react';
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {

    const { selectedProject, deleteProject } = useContext(proyectoContext)
    const { currentTasks } = useContext(tareaContext)
    const nodeRef = React.useRef(null);
    // Si no hay proyecto, retorna null
    if(selectedProject === null) return <h2>Selecciona un proyecto</h2>

    const [proyectoActual] = selectedProject

    const handleDeleteClick = () => {
        deleteProject(proyectoActual._id)
    }

    return (
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                { currentTasks === null || currentTasks.length === 0 ? 
                    (
                        <li className="tarea"><p>No hay tareas</p></li>
                    )
                    :
                    <TransitionGroup>
                        {currentTasks.map(tarea => 
                        <CSSTransition
                            // nodeRef={nodeRef}
                            key={tarea._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea
                                tarea={tarea}
                            />
                        </CSSTransition>
                    )}
                    </TransitionGroup>
                }
            </ul>
            <button 
                type="button" 
                className="btn btn-eliminar sombra" 
                style={{backgroundColor: "white"}}
                onClick={handleDeleteClick}
            >
                Eliminar Proyecto &times;
            </button>

        </>
    );
};

export default ListadoTareas;