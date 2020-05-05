import React from 'react'

const InicioContext = React.createContext()

const initialState = {
    datos: '',
    data: ''
}

function inicioFunctionReducer(state, [action, payload]) {
    switch (action) {
        case 'datos':
            return { ...state, datos: payload };

        case 'data':
            return { ...state, data: payload }

        default:
            return state;
    }
}

export const InicioContextProvider = InicioContext.Provider

export const InicioContextProviders = (props) => {
    const [inicio, dispatchInicio] = React.useReducer(inicioFunctionReducer, initialState)

    return (<InicioContextProvider value={{ inicio, dispatchInicio }}>
        {props.children}
    </InicioContextProvider>)
}

export default InicioContext	