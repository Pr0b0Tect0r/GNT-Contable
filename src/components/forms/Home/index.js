import React from 'react'
import Inicio from './Inicio';
import { InicioContextProviders } from './inicioContext';

function IndexInicio() {
    return (
        <InicioContextProviders>
            <Inicio />
        </InicioContextProviders>
    )
}

export default IndexInicio;