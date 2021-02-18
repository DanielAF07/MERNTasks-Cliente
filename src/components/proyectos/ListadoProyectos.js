import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const Listado = () => {
    // Extraer proyectos de ProyectoState
    const { proyectos, getProjects } = useContext(proyectoContext)
        
    useEffect(() => {
        getProjects();
    }, []);

    if(proyectos.length === 0) return <p>No hay proyectos</p>

    return (
    <ul className="listado-proyectos">
        <TransitionGroup>
            {proyectos.map(proyecto => (
                <CSSTransition
                    // nodeRef={useRef}
                    key={proyecto._id}
                    timeout={200}
                    classNames="proyecto"
                >
                    <Proyecto
                        proyecto={proyecto}
                    />
                </CSSTransition>
            ))}
        </TransitionGroup>
    </ul>
        );
};

export default Listado;