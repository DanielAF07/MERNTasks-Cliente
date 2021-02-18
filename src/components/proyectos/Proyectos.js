import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'
import AuthContext from '../../context/autenticacion/authContext'
import Spinner from '../misc/Spinner'

const Proyectos = () => {
    //Extraer info de auth
    const { usuarioAutenticado, cargando, autenticado } = useContext(AuthContext)

    useEffect(() => {
        usuarioAutenticado()
    }, [autenticado]);

    return (
        <>
            { cargando ? <Spinner /> : null}
            <div className="contenedor-app">
                <Sidebar />
                <div className="seccion-principal">
                    <Barra />
                    <main>
                        <FormTarea />
                        <div className="contenedor-tareas">
                            <ListadoTareas />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Proyectos;