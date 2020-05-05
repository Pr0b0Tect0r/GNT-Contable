import React from 'react';
import { DATA_TYPES } from 'constants/app'

const AnexoContext = React.createContext()

const initialState = {
    lista: [],
    cabeceras: [
        { title: 'ID', field: 'id_anexo', width: 20 },
        { title: 'Nombre', field: 'nm_anexo' },
        { title: 'Alias', field: 'nm_alias' },
        { title: 'T. documento', field: 'tdocumento' },
        { title: 'Documento', field: 'ruc' },
        { title: 'Estado', field: 'nomestado' }
    ],
    filterConfig: [
        { field: "id_anexo", label: "ID", type: DATA_TYPES.NUMBER },
        { field: "nm_anexo", tbfield: "nm_anexo_tb", label: "Nombre de Anexo", type: DATA_TYPES.STRING },
        { field: "nm_alias", tbfield: "nm_alias_tb", label: "Alias", type: DATA_TYPES.STRING },
        { field: "tdocumento", tbfield: "tdocumento_tb", label: "Tipo de documento", type: DATA_TYPES.STRING },
        { field: "ruc", tbfield: "ruc_tb", label: "Documento", type: DATA_TYPES.STRING },
        { field: "nomestado", tbfield: "nomestado_tb", label: "Estado", type: DATA_TYPES.STRING },
    ],
    anexoInfo: {},
    reportQuery: {
        "id_empresa": "1",
        "id_anexo": "0",

        "nm_anexo_tb": "1",
        "nm_anexo": "estac",

        "nm_alias_tb": "0",
        "nm_alias": "",

        "tdocumento_tb": "0",
        "tdocumento": "",

        "ruc_tb": "0",
        "ruc": "",

        "nomestado_tb": "0",
        "nomestado": "",

        "sortcolumn": "",
        "sortorder": ""
    }
}

function anexoFunctionReducer(state, [action, payload]) {
    switch (action) {
        case 'lista':
            return { ...state, lista: payload };

        case 'anexoInfo':
            return { ...state, anexoInfo: payload };

        case 'limpiar':
            return { ...state, anexoInfo: payload };

        default:
            return state;
    }
}

export const AnexoContextProvider = AnexoContext.Provider

export const AnexoContextProviders = (props) => {
    const [anexo, dispatchAnexo] = React.useReducer(anexoFunctionReducer, initialState)

    return (<AnexoContextProvider value={{ anexo, dispatchAnexo }}>
        {props.children}
    </AnexoContextProvider>)
}

export default AnexoContext	