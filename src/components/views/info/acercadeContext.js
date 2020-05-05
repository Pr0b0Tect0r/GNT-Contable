import React from 'react'

const AcercadeContext = React.createContext()

const initialState = {
	texto: {}
}

function acercadeFunctionReducer(state, [action, payload]) {
	switch (action) {

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion };

		default:
			return state;
	}
}

export const AcercadeContextProvider = AcercadeContext.Provider

export const AcercadeContextProviders = (props) => {
	const [acercade, dispatchAcercade] = React.useReducer(acercadeFunctionReducer, initialState)

	return (<AcercadeContextProvider value={{ acercade, dispatchAcercade }}>
		{props.children}
	</AcercadeContextProvider>)
}

export default AcercadeContext	