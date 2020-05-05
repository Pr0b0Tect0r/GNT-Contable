import React from 'react'
import Anexo from './Anexo';
import { AnexoContextProviders } from './anexoContext';

function IndexAnexo() {
    return (
        <AnexoContextProviders>
            <Anexo />
        </AnexoContextProviders>
    )
}

export default IndexAnexo;