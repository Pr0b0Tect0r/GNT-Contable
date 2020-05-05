import React from 'react';
import { loginFunctionReducer, initialState } from './LoginReducer'

const LoginContext = React.createContext()
export const LoginContextProvider = LoginContext.Provider

export const LoginContextProviders = (props) => {
    const [authLogin, dispatchLogin] = React.useReducer(loginFunctionReducer, initialState)

    return (<LoginContextProvider value={{ authLogin, dispatchLogin }}>
        {props.children}
    </LoginContextProvider>)

}

export default LoginContext