import React from 'react'
import { interactionFunctionReducer, initialState } from './InteractionReducer';

const AppInteractionContext = React.createContext()
export const AppInteractionProvider = AppInteractionContext.Provider


export const AppInteractionContextProvider = (props) => {
    const [interactions, dispatch] = React.useReducer(interactionFunctionReducer, initialState)

    return (<AppInteractionProvider value={{ interactions, dispatch }}>
        {props.children}
    </AppInteractionProvider>)
}

export default AppInteractionContext